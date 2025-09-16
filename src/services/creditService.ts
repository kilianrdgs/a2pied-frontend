class CreditService {
  private baseUrl = 'http://localhost:3000';

  async saveCredits(credits: number) {
    try {
      const response = await fetch(`${this.baseUrl}/api/credits/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userEmail: localStorage.getItem('email'),
          credits,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to save credits to backend:', error);
      throw error;
    }
  }

  async getCredits() {
    try {
      const response = await fetch(`${this.baseUrl}/api/credits/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userEmail: localStorage.getItem('email')
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch credits:', error);
      throw error;
    }
  }
}

export const creditService = new CreditService();