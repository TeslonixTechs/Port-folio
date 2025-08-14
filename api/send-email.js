const nodemailer = require('nodemailer');

export default async function handler(req, res) {
	if(req.method !== 'POST') {
		return res.status(405).end();
	}

	const { name, email, message } = req.body;

	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	const mailOptions = {
		from: email,
		to: 'teslonix@gmail.com',
		subject: `Contact from ${name}`,
		text: message
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		console.log(err)
	}
}