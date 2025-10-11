const Visitor = require("../models/visitor");

exports.trackVisitor = async (req, res) => {
    try {
        const ip = req.ip;
        const today = new Date().toISOString().split('T')[0];
        const userAgent = req.headers['user-agent'] || '';

        const isBot = /bot|crawl|spider|slurp/i.test(userAgent);
        if (isBot) return res.json({ message: "Bot ignored" });

        const exists = await Visitor.findOne({ ip, date: today });
        if (!exists) {
            await Visitor.create({ ip, date: today });
        }

        const totalCount = await Visitor.countDocuments();
        const dailyCount = await Visitor.countDocuments({ date: today });

        res.json({ total: totalCount, daily: dailyCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
