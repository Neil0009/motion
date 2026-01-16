import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { userEmail, projectId, type, title, message, actionUrl } = await req.json();

    if (!userEmail || !type || !title || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create notification in database
    const notification = await base44.asServiceRole.entities.Notification.create({
      user_email: userEmail,
      project_id: projectId,
      type,
      title,
      message,
      action_url: actionUrl,
      read: false,
    });

    // Send email notification asynchronously
    try {
      await base44.asServiceRole.functions.invoke('sendNotificationEmail', {
        userEmail,
        title,
        message,
        actionUrl,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue even if email fails
    }

    return Response.json({ success: true, notification });

  } catch (error) {
    console.error('Create notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});