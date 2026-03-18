export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, projectType, budget, message } = req.body;

  if (!name || !email || !projectType) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  // ═══════════════════════════════════════════
  // EMAIL 1: Notification pour Brahim
  // ═══════════════════════════════════════════
  const notificationHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

<tr><td style="background:#08080C;border-radius:16px 16px 0 0;padding:32px 40px;">
<table cellpadding="0" cellspacing="0"><tr>
<td style="width:40px;height:40px;background:linear-gradient(135deg,#FF6B35,#FFD23F);border-radius:50%;text-align:center;vertical-align:middle;">
<span style="font-family:Arial;font-size:18px;font-weight:bold;color:#08080C;">B</span>
</td>
<td style="padding-left:14px;">
<div style="font-family:Arial;font-size:18px;font-weight:bold;color:#FF6B35;">Nouvelle demande de contact</div>
<div style="font-family:Arial;font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">${dateStr} à ${timeStr}</div>
</td>
</tr></table>
</td></tr>

<tr><td style="background:#ffffff;padding:36px 40px;">

<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
<tr>
<td style="font-family:Arial;font-size:13px;color:#888;padding:14px 0;border-bottom:1px solid #f0f0f2;width:35%;font-weight:600;">Nom</td>
<td style="font-family:Arial;font-size:14px;color:#222;padding:14px 0;border-bottom:1px solid #f0f0f2;font-weight:700;">${name}</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:13px;color:#888;padding:14px 0;border-bottom:1px solid #f0f0f2;font-weight:600;">Email</td>
<td style="font-family:Arial;font-size:14px;color:#222;padding:14px 0;border-bottom:1px solid #f0f0f2;"><a href="mailto:${email}" style="color:#FF6B35;text-decoration:none;font-weight:600;">${email}</a></td>
</tr>
<tr>
<td style="font-family:Arial;font-size:13px;color:#888;padding:14px 0;border-bottom:1px solid #f0f0f2;font-weight:600;">Téléphone</td>
<td style="font-family:Arial;font-size:14px;color:#222;padding:14px 0;border-bottom:1px solid #f0f0f2;font-weight:600;">${phone || "Non renseigné"}</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:13px;color:#888;padding:14px 0;border-bottom:1px solid #f0f0f2;font-weight:600;">Type de projet</td>
<td style="padding:14px 0;border-bottom:1px solid #f0f0f2;">
<span style="font-family:Arial;font-size:12px;color:#FF6B35;font-weight:700;background:#FFF5F0;padding:5px 12px;border-radius:6px;">${projectType}</span>
</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:13px;color:#888;padding:14px 0;border-bottom:1px solid #f0f0f2;font-weight:600;">Budget</td>
<td style="padding:14px 0;border-bottom:1px solid #f0f0f2;">
<span style="font-family:Arial;font-size:12px;color:#00875A;font-weight:700;background:#E3FCEF;padding:5px 12px;border-radius:6px;">${budget || "Non défini"}</span>
</td>
</tr>
</table>

${message ? `
<div style="background:#f8f9fa;border-radius:12px;padding:20px 24px;border-left:4px solid #FF6B35;margin-bottom:24px;">
<div style="font-family:Arial;font-size:11px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">MESSAGE DU CLIENT</div>
<p style="font-family:Arial;font-size:14px;color:#333;line-height:1.7;margin:0;">${message}</p>
</div>
` : ""}

<div style="text-align:center;padding-top:8px;">
<a href="mailto:${email}?subject=Re: Votre demande de projet — ${projectType}&body=Bonjour ${name},%0D%0A%0D%0AMerci pour votre demande concernant votre projet de ${projectType}.%0D%0A%0D%0A" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#FF6B35,#FF8B5E);border-radius:10px;font-family:Arial;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">Répondre à ${name}</a>
</div>

</td></tr>

<tr><td style="background:#f8f9fa;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
<p style="font-family:Arial;font-size:11px;color:#aaa;margin:0;">Reçu depuis le formulaire de contact — brahimouchrif.com</p>
</td></tr>

</table></td></tr></table></body></html>`;

  // ═══════════════════════════════════════════
  // EMAIL 2: Confirmation pour le client
  // ═══════════════════════════════════════════
  const confirmationHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

<!-- Header gradient -->
<tr><td style="background:linear-gradient(135deg,#FF6B35,#FFD23F);border-radius:16px 16px 0 0;padding:36px 40px;">
<table cellpadding="0" cellspacing="0"><tr>
<td style="width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:50%;text-align:center;vertical-align:middle;">
<span style="font-family:Arial;font-size:20px;font-weight:bold;color:#fff;">B</span>
</td>
<td style="padding-left:14px;">
<div style="font-family:Arial;font-size:16px;font-weight:bold;color:#fff;">Brahim Ouchrif</div>
<div style="font-family:Arial;font-size:12px;color:rgba(255,255,255,0.8);">Développeur Web Freelance</div>
</td>
</tr></table>
<h1 style="font-family:Arial;font-size:24px;font-weight:bold;color:#fff;margin:24px 0 0;">Merci pour votre demande !</h1>
</td></tr>

<!-- Body -->
<tr><td style="background:#ffffff;padding:36px 40px;">
<p style="font-family:Arial;font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
Bonjour <strong>${name}</strong>,
</p>
<p style="font-family:Arial;font-size:15px;color:#555;line-height:1.7;margin:0 0 28px;">
J'ai bien reçu votre demande et je vous remercie de votre confiance. Je prends connaissance de votre projet et je reviens vers vous dans les <strong style="color:#FF6B35;">24 prochaines heures</strong> avec une première analyse.
</p>

<!-- Recap card -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;border-radius:12px;border:1px solid #eeeff2;margin-bottom:28px;">
<tr><td style="padding:24px 28px;">
<div style="font-family:Arial;font-size:12px;font-weight:bold;color:#FF6B35;text-transform:uppercase;letter-spacing:1px;margin-bottom:18px;">Récapitulatif de votre demande</div>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="font-family:Arial;font-size:12px;color:#999;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:500;">Nom</td>
<td style="font-family:Arial;font-size:13px;color:#333;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:600;text-align:right;">${name}</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:12px;color:#999;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:500;">Email</td>
<td style="font-family:Arial;font-size:13px;color:#333;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:600;text-align:right;">${email}</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:12px;color:#999;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:500;">Téléphone</td>
<td style="font-family:Arial;font-size:13px;color:#333;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:600;text-align:right;">${phone || "Non renseigné"}</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:12px;color:#999;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:500;">Type de projet</td>
<td style="font-family:Arial;font-size:13px;color:#FF6B35;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:700;text-align:right;">${projectType}</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:12px;color:#999;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:500;">Budget estimé</td>
<td style="font-family:Arial;font-size:13px;color:#333;padding:10px 0;border-bottom:1px solid #eeeff2;font-weight:600;text-align:right;">${budget || "Non défini"}</td>
</tr>
<tr>
<td style="font-family:Arial;font-size:12px;color:#999;padding:10px 0;font-weight:500;">Date</td>
<td style="font-family:Arial;font-size:13px;color:#333;padding:10px 0;font-weight:600;text-align:right;">${dateStr}</td>
</tr>
</table>
${message ? `
<div style="margin-top:18px;padding-top:18px;border-top:1px solid #eeeff2;">
<div style="font-family:Arial;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Votre message</div>
<p style="font-family:Arial;font-size:13px;color:#555;line-height:1.6;font-style:italic;margin:0;">"${message}"</p>
</div>
` : ""}
</td></tr></table>

<!-- Next steps -->
<div style="margin-bottom:28px;">
<div style="font-family:Arial;font-size:12px;font-weight:bold;color:#FF6B35;text-transform:uppercase;letter-spacing:1px;margin-bottom:18px;">Prochaines étapes</div>
<table cellpadding="0" cellspacing="0" width="100%">
<tr><td style="padding-bottom:14px;">
<table cellpadding="0" cellspacing="0"><tr>
<td style="width:32px;height:32px;background:linear-gradient(135deg,#FF6B35,#FFD23F);border-radius:10px;text-align:center;vertical-align:middle;">
<span style="font-family:Arial;font-size:14px;font-weight:bold;color:#fff;">1</span>
</td>
<td style="padding-left:14px;font-family:Arial;font-size:14px;color:#555;line-height:1.5;"><strong style="color:#333;">Analyse</strong> — J'étudie votre demande en détail</td>
</tr></table>
</td></tr>
<tr><td style="padding-bottom:14px;">
<table cellpadding="0" cellspacing="0"><tr>
<td style="width:32px;height:32px;background:linear-gradient(135deg,#FF6B35,#FFD23F);border-radius:10px;text-align:center;vertical-align:middle;">
<span style="font-family:Arial;font-size:14px;font-weight:bold;color:#fff;">2</span>
</td>
<td style="padding-left:14px;font-family:Arial;font-size:14px;color:#555;line-height:1.5;"><strong style="color:#333;">Devis</strong> — Je vous envoie une proposition personnalisée</td>
</tr></table>
</td></tr>
<tr><td>
<table cellpadding="0" cellspacing="0"><tr>
<td style="width:32px;height:32px;background:linear-gradient(135deg,#FF6B35,#FFD23F);border-radius:10px;text-align:center;vertical-align:middle;">
<span style="font-family:Arial;font-size:14px;font-weight:bold;color:#fff;">3</span>
</td>
<td style="padding-left:14px;font-family:Arial;font-size:14px;color:#555;line-height:1.5;"><strong style="color:#333;">Appel</strong> — On planifie un échange pour approfondir</td>
</tr></table>
</td></tr>
</table>
</div>

<p style="font-family:Arial;font-size:15px;color:#555;line-height:1.7;margin:0 0 4px;">À très vite,</p>
<p style="font-family:Arial;font-size:18px;font-weight:bold;color:#222;margin:0;">Brahim Ouchrif</p>
</td></tr>

<!-- Footer -->
<tr><td style="background:#f8f9fa;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #eeeff2;">
<div style="margin-bottom:12px;">
<a href="https://brahimouchrif.com" style="font-family:Arial;font-size:12px;color:#FF6B35;text-decoration:none;font-weight:600;">brahimouchrif.com</a>
</div>
<p style="font-family:Arial;font-size:11px;color:#aaa;margin:0;">© 2026 Brahim Ouchrif — Développeur Web Freelance</p>
</td></tr>

</table></td></tr></table></body></html>`;

  try {
    // Email 1: Notification to Brahim
    const notifRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: "brahimouchrif@gmail.com",
        subject: `[Portfolio] Nouvelle demande — ${name} — ${projectType}`,
        html: notificationHtml,
        reply_to: email,
      }),
    });

    if (!notifRes.ok) {
      const err = await notifRes.json();
      throw new Error(err.message || "Erreur envoi notification");
    }

    // Email 2: Confirmation to client
    const confirmRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Brahim Ouchrif <onboarding@resend.dev>",
        to: email,
        subject: "Brahim Ouchrif — Confirmation de votre demande de projet",
        html: confirmationHtml,
        reply_to: "brahimouchrif@gmail.com",
      }),
    });

    if (!confirmRes.ok) {
      const err = await confirmRes.json();
      console.error("Confirmation email error:", err);
      // On ne fait pas échouer si la confirmation échoue, la notification est passée
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Erreur lors de l'envoi. Veuillez réessayer." });
  }
}
