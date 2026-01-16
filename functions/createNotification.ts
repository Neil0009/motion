import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { event, data, old_data } = await req.json();

    if (!event || !data) {
      return Response.json({ error: 'Missing event data' }, { status: 400 });
    }

    let notificationData = null;

    // Handle different entity types
    if (event.entity_name === 'ProjectMessage') {
      // Get project to find client email
      const projects = await base44.asServiceRole.entities.ClientProject.list();
      const project = projects.find(p => p.id === data.project_id);
      
      if (project && !data.is_admin) {
        // Admin sent message to client
        notificationData = {
          userEmail: project.client_email,
          projectId: data.project_id,
          type: 'message',
          title: 'New Message',
          message: `You have a new message from the studio team.`,
          actionUrl: `/project-portal?id=${data.project_id}&tab=messages`,
        };
      }
    } else if (event.entity_name === 'ProjectMilestone') {
      // Get project to find client email
      const projects = await base44.asServiceRole.entities.ClientProject.list();
      const project = projects.find(p => p.id === data.project_id);
      
      if (project && old_data && data.status !== old_data.status) {
        notificationData = {
          userEmail: project.client_email,
          projectId: data.project_id,
          type: 'milestone',
          title: 'Milestone Updated',
          message: `Milestone "${data.title}" status changed to ${data.status.replace('-', ' ')}.`,
          actionUrl: `/project-portal?id=${data.project_id}&tab=milestones`,
        };
      }
    } else if (event.entity_name === 'ProjectFile') {
      // Get project to find client email
      const projects = await base44.asServiceRole.entities.ClientProject.list();
      const project = projects.find(p => p.id === data.project_id);
      
      if (project) {
        notificationData = {
          userEmail: project.client_email,
          projectId: data.project_id,
          type: 'file',
          title: 'New File Uploaded',
          message: `A new file "${data.file_name}" has been uploaded to your project.`,
          actionUrl: `/project-portal?id=${data.project_id}&tab=files`,
        };
      }
    } else if (event.entity_name === 'Invoice') {
      notificationData = {
        userEmail: data.client_email,
        projectId: data.project_id,
        type: 'invoice',
        title: event.type === 'create' ? 'New Invoice' : 'Invoice Updated',
        message: event.type === 'create' 
          ? `Invoice #${data.invoice_number} has been issued.`
          : `Invoice #${data.invoice_number} status changed to ${data.status}.`,
        actionUrl: `/project-portal?id=${data.project_id}&tab=invoices`,
      };
    }

    if (!notificationData) {
      return Response.json({ success: true, message: 'No notification needed' });
    }

    // Create notification in database
    await base44.asServiceRole.entities.Notification.create({
      user_email: notificationData.userEmail,
      project_id: notificationData.projectId,
      type: notificationData.type,
      title: notificationData.title,
      message: notificationData.message,
      action_url: notificationData.actionUrl,
      read: false,
    });

    // Send email notification asynchronously
    try {
      await base44.asServiceRole.functions.invoke('sendNotificationEmail', {
        userEmail: notificationData.userEmail,
        title: notificationData.title,
        message: notificationData.message,
        actionUrl: `${Deno.env.get('BASE44_APP_URL')}${notificationData.actionUrl}`,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Create notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});