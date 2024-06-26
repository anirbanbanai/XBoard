const Footer = require("../../models/v1/footer.model");

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne({});
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFooter = async (req, res) => {
  try {
    const newFooter = new Footer(req.body);
    const savedFooter = await newFooter.save();
    res.json(savedFooter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne({});
    let body = [];
    // Services
    if (req.query.services === "true") {
      footer.services.forEach((service) => {
        body.push(service);
      });
      body.push(req.body);
      try {
        const updatedFooter = await Footer.findByIdAndUpdate(
          footer._id,
          { $set: { services: body } },
          { new: true }
        );
        res.json(updatedFooter);
      } catch (error) {
        res.json({ error: error.message });
      }
    }
    // Terms
    if (req.query.terms === "true") {
      footer.legal.terms.forEach((term) => {
        body.push(term);
      });
      body.push(req.body);
      try {
        const updatedFooter = await Footer.findByIdAndUpdate(
          footer._id,
          { $set: { "legal.terms": body } },
          { new: true }
        );
        res.json(updatedFooter);
      } catch (error) {
        res.json({ error: error.message });
      }
    }
    // faq
    if (req.query.faq === "true") {
      footer.legal.faq.forEach((term) => {
        body.push(term);
      });
      body.push(req.body);
      try {
        const updatedFooter = await Footer.findByIdAndUpdate(
          footer._id,
          { $set: { "legal.faq": body } },
          { new: true }
        );
        res.json(updatedFooter);
      } catch (error) {
        res.json({ error: error.message });
      }
    }
    // policy
    if (req.query.policy === "true") {
      footer.legal.policy.forEach((term) => {
        body.push(term);
      });
      body.push(req.body);
      try {
        const updatedFooter = await Footer.findByIdAndUpdate(
          footer._id,
          { $set: { "legal.policy": body } },
          { new: true }
        );
        res.json(updatedFooter);
      } catch (error) {
        res.json({ error: error.message });
      }
    }

       // price
       if (req.query.price === "true") {
        
        try {
          const updatedFooter = await Footer.findByIdAndUpdate(
            footer._id,
            { $set: { pricing: req.body } },
            { new: true }
          );
          res.json(updatedFooter);
        } catch (error) {
          res.json({ error: error.message });
        }
      }

    // console.log("this is body", { body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFooter = async (req, res) => {
  try {
    await Footer.findByIdAndDelete(req.params.id);
    res.json({ message: "Footer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
