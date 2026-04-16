const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // serves index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 1. CALLBACK - PayHero hits this after payment
app.post('/callback', (req, res) => {
  const data = req.body;
  
  if (data.status === 'Success' && data.reference) {
    fs.appendFileSync(LOG_FILE, data.reference + '\n');
    console.log('Payment logged:', data.reference);
    return res.status(200).json({ status: "success" });
  }
  
  res.status(400).json({ status: "failed" });
});

// 2. VERIFY - Your frontend polls this to check if paid
app.get('/verify', (req, res) => {
  const ref = req.query.ref;
  if (!ref) return res.json({ paid: false });

  if (fs.existsSync(LOG_FILE)) {
    const paidRefs = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
    if (paidRefs.includes(ref)) {
      return res.json({ 
        paid: true, 
        link: "https://chat.whatsapp.com/EhovAIyjanh6y55sXt45ib?mode=gi_t" 
      });
    }
  }
  
  res.json({ paid: false });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));