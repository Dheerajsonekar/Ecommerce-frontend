const mongoose = require("mongoose");
//const mongoURI = "mongodb+srv://foddie:kalki@cluster0.fgh84eq.mongodb.net/foddiemern?retryWrites=true&w=majority";
const mongoURI = "mongodb://foddie:kalki@ac-m4cdzrv-shard-00-00.fgh84eq.mongodb.net:27017,ac-m4cdzrv-shard-00-01.fgh84eq.mongodb.net:27017,ac-m4cdzrv-shard-00-02.fgh84eq.mongodb.net:27017/foddiemern?ssl=true&replicaSet=atlas-tw4zwm-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB = async() => {
   await mongoose.connect(mongoURI, {useNewUrlParser: true}, async(err, result) => {
        if (err) console.log("---", err);
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function(err, data){
                const foodCategory = await mongoose.connection.db.collection("food_Category");
                foodCategory.find({}).toArray(function (err, catData) {
                    if(err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

                
            //  if(err) console.log(err);
            //  else {
            //     global.food_items = data;
            //     global.foodCategory = catData;
                
            //  }
            })
        }
    });
};

module.exports = mongoDB;
