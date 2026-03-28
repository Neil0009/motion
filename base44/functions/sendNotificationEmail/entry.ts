import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { userEmail, title, message, actionUrl } = await req.json();

    if (!userEmail || !title || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email notification
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: userEmail,
      subject: `Studio Nakxal: ${title}`,
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%); padding: 30px; text-align: center;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">Studio Nakxal</h1>
          </div>
          
          <div style="padding: 30px; background: #fff;">
            <h2 style="color: #333; margin-bottom: 20px;">${title}</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">${message}</p>
            
            ${actionUrl ? `
              <a href="${actionUrl}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%); color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">
                View in Portal
              </a>
            ` : ''}
          </div>
          
          <div style="padding: 20px; background: #f9f9f9; text-align: center; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Studio Nakxal. All rights reserved.</p>
          </div>
        </div>
      `
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Send notification email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});