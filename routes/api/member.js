const express=require('express');
const router=express.Router();
const people=require('../../Members'); 





//get all members
router.get('/', (req, res)=> res.json(people));

//get single member
router.get('/:id', (req, res)=>{

    const found= people.some(member=>member.id===parseInt(req.params.id));

    if(found){
        res.json(people.filter(member=>member.id===parseInt(req.params.id)));
    }else{
        res.status(400).json({ msg : `no id found ${req.params.id}`});
    }
    
})

//create members

router.post('/', (req, res)=> {
    const newMember= {
        name: req.body.name,
        email: req.body.email
    }

    if(!newMember.name||!newMember.email){
        res.status(400).json({ msg: 'please enter name and email both'});
    }else{
        people.push(newMember);
        //res.json(people);
        res.redirect('/');
    }

   
})

//update member

router.put('/:id', (req, res)=>{

    const found= people.some(member=>member.id===parseInt(req.params.id));
    const updMember=req.body;

    if(found){

        people.forEach(member=> {
            if(member.id===parseInt(req.params.id)){
                member.name=updMember.name?updMember.name:member.name;
                member.email=updMember.email?updMember.email:member.email;

                res.json({msg: 'member updated', member})
            }
        })
       
    }else{
        res.status(400).json({ msg : `no id found ${req.params.id}`});
    }
    
})


router.delete('/:id', (req, res)=>{

    const found= people.some(member=>member.id===parseInt(req.params.id));

    if(found){
        res.json({msg: 'member deleted', member: people.filter(member=>member.id!==parseInt(req.params.id))});
    }else{
        res.status(400).json({ msg : `no id found ${req.params.id}`});
    }
    
})

module.exports=router;