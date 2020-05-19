var express=require("express");
var router=express.Router();

router.get('/:id',(req,res)=>{
    res.send('details for movie ' +req.params.id)
});
router.get('/',(req,res)=>{
    res.send('get movie')
});
router.post('/',(req,res)=>{
    res.send('post movie')
});
router.put('/:id',(req,res)=>{
    res.send('edit movie number '+req.params.id)
});
router.delete('/:id',(req,res)=>{
    res.send('delete movie number '+req.params.id)
});


module.exports=router
