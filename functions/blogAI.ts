import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { action, data } = await req.json();

    if (action === 'generate_ideas') {
      const { topic, count = 5 } = data;
      
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate ${count} creative and engaging blog post ideas for a studio that offers product animation and architectural visualization services. ${topic ? `Focus on the topic: ${topic}` : ''}
        
        For each idea, provide:
        1. Title (catchy and SEO-friendly)
        2. Brief description (2-3 sentences)
        3. Suggested category (product-animation, architecture, industry-insights, case-studies, tutorials, or tips-tricks)
        4. 3-5 relevant tags
        
        Make the ideas practical, valuable for the target audience (designers, architects, product managers, marketers), and showcase expertise.`,
        response_json_schema: {
          type: "object",
          properties: {
            ideas: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  category: { type: "string" },
                  tags: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      });

      return Response.json({ success: true, ideas: response.ideas });
    }

    if (action === 'write_draft') {
      const { title, category, keywords, tone = 'professional' } = data;
      
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Write a comprehensive blog post with the following details:
        
        Title: ${title}
        Category: ${category}
        Keywords to include: ${keywords || 'N/A'}
        Tone: ${tone}
        
        Requirements:
        - Write 800-1200 words
        - Use Markdown formatting
        - Include an engaging introduction
        - Use subheadings (##) for sections
        - Add practical examples and insights
        - End with a clear conclusion and call-to-action
        - Make it valuable for designers, architects, and business owners
        - SEO-optimized but natural writing
        
        Context: We are a studio specializing in product animation (promo videos, assembly guides, exploded views) and architectural visualization (3D renders, BIM, CAD documentation).`,
        response_json_schema: {
          type: "object",
          properties: {
            content: { type: "string" },
            excerpt: { type: "string" },
            suggested_tags: { type: "array", items: { type: "string" } },
            read_time: { type: "number" }
          }
        }
      });

      return Response.json({ success: true, draft: response });
    }

    if (action === 'suggest_tags') {
      const { title, content } = data;
      
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Analyze this blog post and suggest 5-8 relevant tags:
        
        Title: ${title}
        Content: ${content.substring(0, 500)}...
        
        Provide tags that are:
        - Relevant to the content
        - SEO-friendly
        - Mix of specific and general terms
        - Lowercase
        - Separated by hyphens if multi-word`,
        response_json_schema: {
          type: "object",
          properties: {
            tags: { type: "array", items: { type: "string" } },
            category: { type: "string" }
          }
        }
      });

      return Response.json({ success: true, suggestions: response });
    }

    if (action === 'improve_content') {
      const { content, focus } = data;
      
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Improve this blog post content${focus ? ` with focus on: ${focus}` : ''}:
        
        ${content}
        
        Make it more engaging, clear, and professional while maintaining the original message. Return the improved version in Markdown.`,
      });

      return Response.json({ success: true, improved_content: response });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});