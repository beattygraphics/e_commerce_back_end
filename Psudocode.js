// MAKE MODELS
  // Product
    // Foreign key category_id references Category
  // ProductTag
    // Foreign key product_id references Product
    // Foregin key tag_id references Tag
  // Category
  // Tag

// Relationships
  // Product to Category is 1:many
    // belongsTo
    // hasMany
  // Prodcut to Tag is many:many
    // belongsToMany
    // through ProductTag

// If the above is done properly, seeds work

// ROUTES