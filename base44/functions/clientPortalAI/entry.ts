import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { question, projectId } = await req.json();

    if (!question) {
      return Response.json({ error: 'Question is required' }, { status: 400 });
    }

    // Fetch project data if projectId is provided
    let contextData = {
      userName: user.full_name || user.email,
      userEmail: user.email,
    };

    if (projectId) {
      const projects = await base44.entities.ClientProject.list();
      const project = projects.find(p => p.id === projectId);

      if (project && project.client_email === user.email) {
        contextData.project = {
          name: project.project_name,
          type: project.project_type,
          status: project.status,
          progress: project.progress_percentage,
          description: project.description,
          startDate: project.start_date,
          estimatedCompletion: project.estimated_completion,
        };

        // Fetch milestones
        const milestones = await base44.asServiceRole.entities.ProjectMilestone.filter(
          { project_id: projectId },
          'order'
        );
        contextData.milestones = milestones.map(m => ({
          title: m.title,
          status: m.status,
          dueDate: m.due_date,
          description: m.description,
        }));

        // Fetch recent messages
        const messages = await base44.asServiceRole.entities.ProjectMessage.filter(
          { project_id: projectId },
          '-created_date',
          5
        );
        contextData.recentMessages = messages.map(m => ({
          sender: m.sender_name,
          message: m.message,
          isAdmin: m.is_admin,
          date: m.created_date,
        }));

        // Fetch files count
        const files = await base44.asServiceRole.entities.ProjectFile.filter({ project_id: projectId });
        contextData.filesCount = files.length;
      }
    } else {
      // Fetch all user's projects for general questions
      const projects = await base44.entities.ClientProject.filter({ client_email: user.email });
      contextData.projects = projects.map(p => ({
        name: p.project_name,
        type: p.project_type,
        status: p.status,
        progress: p.progress_percentage,
      }));
    }

    // Build AI prompt
    const systemPrompt = `You are a helpful AI assistant for Studio Nakxal, a premium 3D visualization and motion design studio. You help clients understand their project status, answer questions about their work, and provide guidance.

Available project information:
${JSON.stringify(contextData, null, 2)}

Guidelines:
- Be friendly, professional, and concise
- Use the project data to provide specific, accurate answers
- If asked about timelines, reference the actual project dates
- If asked about next steps, consider the current milestone status
- If you don't have specific information, be honest and suggest contacting the studio team
- For technical questions about 3D visualization, BIM, CAD, or video production, provide helpful context
- Keep responses under 150 words unless more detail is specifically requested`;

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${systemPrompt}\n\nClient question: ${question}`,
    });

    return Response.json({ 
      response: response,
      success: true 
    });

  } catch (error) {
    console.error('AI Assistant error:', error);
    return Response.json({ 
      error: error.message,
      response: "I'm having trouble processing your request right now. Please try again or contact the studio team directly."
    }, { status: 500 });
  }
});