const flr_trans = document.querySelectorAll(".flr_img")
const back_buttons = document.querySelectorAll(".back_button")
const nav_sidebar = document.querySelectorAll(".replace_txt")


flr_trans.forEach(element => {element.addEventListener("click",(event)=>{ 
    if(document.getElementsByClassName('open_info_card').length == 0){
        open_flr_img(element.id)
        info_pge_mvmnt()
    }
})});

back_buttons.forEach(b_button =>{ b_button.addEventListener("click", (event)=>{close_flr(event) })})

nav_sidebar.forEach(side_ele =>{ side_ele.addEventListener('click', (event)=>{sidebar_switch(side_ele ,event )})})

function open_flr_img(element_id){
    flr_trans.forEach(flrs =>{
        txt_element = document.getElementById(flrs.previousElementSibling.id)
        if(flrs.id == element_id){
            document.getElementById(String(flrs.id).replace('img','info')).classList = 'open_info_card'
            if(window.innerWidth <= 991){
                txt_element.classList.add('replace_text_closed')
                flrs.parentElement.classList.add('navigation_imgs_phone')
            }
            flrs.classList.add(String(flrs.parentElement.id)+'_open')
        }
        else{
            flrs.classList.add('hide_element')
            txt_element.classList.add('replace_text_closed')
        }                     
    }) 
    document.querySelectorAll(".stairs_elmnt").forEach(stair =>{stair.classList.add('hide_element')})
    document.querySelector('.navigation_imgs').classList.add('navigation_imgs_open')
    document.getElementById('info_div').classList = 'info_div_open'
}   

 function close_flr(event){
    console.log(event)
    document.querySelectorAll(".stairs_elmnt").forEach(stair =>{stair.classList.remove('hide_element')})  
    flr_trans.forEach(ele =>{
        ele.classList.remove('hide_element')
        document.getElementById(String(ele.id).replace('img','headline')).classList.remove('replace_text_closed')
        ele.classList.remove(String(ele.parentElement.id)+'_open')
    }) 
    document.querySelector('.navigation_imgs').classList.remove('navigation_imgs_open')
    document.getElementById('info_div').classList='info_div_closed' 
}

function info_pge_mvmnt (){
    infdiv = document.getElementById('info_div')
    infdiv.ontransitionstart = () =>{
        elem_id = document.querySelector('[class$="flr_open"]')
        if(elem_id){    
            flr_mvmt = document.getElementById(String(elem_id.id).replace('img','info'))
            if(infdiv.classList.value == 'info_div_open')
                flr_mvmt.classList = 'open_info_card'
        }}
    infdiv.ontransitionend= () =>{
        if(infdiv.classList.value == 'info_div_closed'){
            document.querySelector('.open_info_card').classList = 'closed_info_card' 
            flr_trans.forEach(element => {element.style.pointerEvents  = null}) 
        }
    }
}        

function sidebar_switch(side_ele ,event){
    side_ele.setAttribute('data-switch' , 'true')       
    let observer = new MutationObserver((mutation)=>{
        side_switch = document.querySelector('[data-switch = "true"]')
        if(side_switch){
            side_switch.removeAttribute('data-switch')
            if(mutation[0].target.className == 'closed_info_card'){
                    open_flr_img(String(side_switch.id).replace('headline','img'))}
        }
    })
    elem_id = document.querySelector('.open_info_card')
    observer.observe(elem_id , {attributes: true})
    close_flr(event)
}