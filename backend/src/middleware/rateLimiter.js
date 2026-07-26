import rateLimit from "express-rate-limit";


export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 800,

  handler: (req, res) => {
    console.log("Rate limit exceeded");
    console.log("IP:", req.ip);

    return res.status(429).json({
      success: false,
      message: "Too many requests",
    });
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  handler : (req , res) => {
    console.log("Rate limit exceeded");
    console.log("IP:", req.ip);

    return res.status(429).json({
      success: false,
      message: "Too many requests",
    });
  }
});


export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  handler : (req , res) => {
    console.log("Rate limit exceeded");
    console.log("IP:", req.ip);     

    return res.status(429).json({
      success: false,
      message: "Too many requests",
    });
  }
});


