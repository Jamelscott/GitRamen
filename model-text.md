# User-model

sequelize model:create --name user --attributes username:string,email:string,password:string

# Restaurant-model

sequelize model:create --name restaurant --attributes name:string

# Review - model 
sequelize model:create --name review --attributes userId:string,restaurantId=string,comment:string,rating:integer


