import rateLimit from "express-rate-limit";


export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,

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
  max: 10,
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
  max: 10,
  handler : (req , res) => {
    console.log("Rate limit exceeded");
    console.log("IP:", req.ip);     

    return res.status(429).json({
      success: false,
      message: "Too many requests",
    });
  }
});


