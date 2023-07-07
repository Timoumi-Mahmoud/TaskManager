

const { query } = require('express')
const Product =require('../models/product')



const getAllProductsStatic =async(req,res)=>{
    
   const products= await Product.find({price:{$gt: 30} })
   .sort('name, -price')
   .select('name  price ')
//    .limit(10)
//    .skip(5)
   console.log(req.query)
    //throw new Error('testing async erros ')
    res.status(200).json({products, nbHits: products.length})
}


const getAllProducts =async(req,res)=>{
    //console.log(req.query)
    //const products= await Product.find(req.query)
   // res.status(200).json({products, nbHits: products.length})
 const {featured, company, name, sort, fields, numericFilters}=req.query
 const queryObject={}
 if(featured){
    queryObject.featured= featured ==='true' ? true: false
 }
 if(company){
    queryObject.company= company
 }

 if(name){
    queryObject.name={$regex: name , $options:'i'}
 }
 if(numericFilters){
    const operatorMap={
        '>':   '$gt',
        '>=':  '$gte',
        '=':   '$eq',
        '<':   '$lt',
        '<=':  '$lte',

    }
    const regEx=/\b(<|>|>=|=|<|<=)\b/g
    let filters= numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
    console.log(filters)
    
    const options= ['price', 'rating']
    filters=   filters.split(',').forEach((item) => {
        const [field, operator, value ]=item.split('-')
        if(options.includes(field)){
            queryObject[field]={[operator]: Number(value)}
        }
        
    });
 
  }



    let result=  Product.find(queryObject)
    //sort
    if(sort){
      console.log(sort)
      const sortList=sort.split(',').join(' ')
      console.log(sortList)
      result= result.sort(sortList)
    }else{
        result=result.sort('createdAt')
    }

    //select by field
    if(fields){
        const fieldList=fields.split(',').join(' ')
        result=result.select(fieldList)
    }


    //limit and skip
    const page =  Number(req.query.page) || 1
    const limit =Number(req.query.limit) || 10
    const skip= (page -1) *limit
    result = result.skip(skip).limit(limit)

    const products= await result
    res.status(200).json({products, nbHits: products.length})

 


}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}
