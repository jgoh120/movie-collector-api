var express=require("express");
var router=express.Router();

router.get(/reviews?/,(req,res)=>{
    res.send('get revew')
});
router.post(/reviews?/,(req,res)=>{
    res.send('post revew')
});
router.put(/reviews?/,(req,res)=>{
    res.send('edit revew')
});
router.delete(/reviews?/,(req,res)=>{
    res.send('delete revew')
});


module.exports=router