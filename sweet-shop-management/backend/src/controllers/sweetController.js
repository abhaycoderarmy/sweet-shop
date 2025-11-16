const Sweet = require('../models/Sweet');
const cloudinary = require('../config/cloudinary');

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().populate('createdBy', 'username email');
    
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single sweet
// @route   GET /api/sweets/:id
// @access  Public
const getSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id).populate('createdBy', 'username email');
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new sweet
// @route   POST /api/sweets
// @access  Private
const createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, description, imageUrl } = req.body;

    // If a file was uploaded, upload to Cloudinary
    let finalImageUrl = imageUrl;
    let finalImagePublicId = '';
    if (req.file && req.file.buffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'sweet-shop' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      finalImageUrl = uploadResult.secure_url;
      finalImagePublicId = uploadResult.public_id;
    }
    
    // Check if sweet with same name exists
    const sweetExists = await Sweet.findOne({ name });
    if (sweetExists) {
      return res.status(400).json({
        success: false,
        message: 'Sweet with this name already exists'
      });
    }
    
    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      description,
      imageUrl: finalImageUrl,
      imagePublicId: finalImagePublicId,
      createdBy: req.user._id
    });
    
    res.status(201).json({
      success: true,
      message: 'Sweet created successfully',
      data: sweet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update sweet
// @route   PUT /api/sweets/:id
// @access  Private
const updateSweet = async (req, res) => {
  try {
    let sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    // Check if updating name and if new name already exists
    if (req.body.name && req.body.name !== sweet.name) {
      const nameExists = await Sweet.findOne({ name: req.body.name });
      if (nameExists) {
        return res.status(400).json({
          success: false,
          message: 'Sweet with this name already exists'
        });
      }
    }
    
    // If a new image file was uploaded, delete old image (if any) and upload to Cloudinary
    if (req.file && req.file.buffer) {
      // delete old image from Cloudinary if present
      if (sweet.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(sweet.imagePublicId);
        } catch (delErr) {
          // Log deletion error but continue
          console.warn('Cloudinary deletion failed for', sweet.imagePublicId, delErr.message || delErr);
        }
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'sweet-shop' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      req.body.imageUrl = uploadResult.secure_url;
      req.body.imagePublicId = uploadResult.public_id;
    }

    sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Sweet updated successfully',
      data: sweet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    // Delete image from Cloudinary if present
    if (sweet.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(sweet.imagePublicId);
      } catch (delErr) {
        console.warn('Cloudinary deletion failed for', sweet.imagePublicId, delErr.message || delErr);
      }
    }

    await Sweet.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Sweet deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Public
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    // Search by name (case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    // Search by category
    if (category) {
      query.category = category.toLowerCase();
    }
    
    // Search by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    const sweets = await Sweet.find(query).populate('createdBy', 'username email');
    
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Purchase sweet (decrease quantity)
// @route   POST /api/sweets/:id/purchase
// @access  Private
const purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }
    
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    if (sweet.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${sweet.quantity} available`
      });
    }
    
    sweet.quantity -= quantity;
    await sweet.save();
    
    res.status(200).json({
      success: true,
      message: `Successfully purchased ${quantity} ${sweet.name}(s)`,
      data: sweet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Restock sweet (increase quantity)
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }
    
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    sweet.quantity += quantity;
    await sweet.save();
    
    res.status(200).json({
      success: true,
      message: `Successfully restocked ${quantity} ${sweet.name}(s)`,
      data: sweet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllSweets,
  getSweet,
  createSweet,
  updateSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet,
  restockSweet
};