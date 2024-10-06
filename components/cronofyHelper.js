import Cronofy from 'cronofy';

const cronofy = new Cronofy({
  client_id: process.env.CRONOFY_CLIENT_ID,
  client_secret: process.env.CRONOFY_CLIENT_SECRET,
  access_token: process.env.CRONOFY_ACCESS_TOKEN, // Store tokens securely
});

export const createInviteLink = async () => {
    try {
      const response = await fetch('https://api.cronofy.com/v1/real_time_scheduling', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CRONOFY_ACCESS_TOKEN}`, // Use your access token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.CRONOFY_CLIENT_ID,
          client_secret: process.env.CRONOFY_CLIENT_SECRET,
          oauth: {
            redirect_uri: 'https://your-redirect-uri.com',
            scope: 'read_events create_event',
          },
          event: {
            summary: 'Meeting',
            description: 'Invitation to schedule a meeting',
            location: {
              description: 'Virtual meeting',
            },
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create invite link');
      }
  
      const data = await response.json();
      return data.url; // Invite link URL
    } catch (error) {
      console.error('Error creating invite link:', error);
      return null;
    }
  };
  
