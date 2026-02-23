export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {

    const response = await fetch("https://script.google.com/macros/s/AKfycbxLJRiMIImriIl-dMrkjDR6yldG0hPAQWZuZoeAeGhNlD3_X9P37yihwl7pHIUHcWYp/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    return res.status(200).json({ result: text });

  } catch (error) {
    return res.status(500).json({ error: "Error conectando con Google" });
  }
}
