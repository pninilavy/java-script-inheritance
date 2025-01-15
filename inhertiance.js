function HtmlElement(type,textContext="")
{
    this.id=HtmlElement.prototype.counter++
    this.type=type
    this.textContext=textContext
    if(new.target)
         throw new Error("can't create an instance of abstract class")
}
HtmlElement.prototype.counter=0
HtmlElement.prototype.render=function(){
    let elem=document.createElement(this.type)
    elem.id="elem"+this.id
    let context=document.createElement("p")
    context.innerHTML=this.textContext
    elem.appendChild(context)
    if(this instanceof ImageElement)
    {
        elem.src=this.src
        elem.alt=this.textContext
    }
    else if(this instanceof SelectElement)
    {
        for (let i = 0; i < this.options.length; i++) {
            let option = document.createElement("option");
            option.value = this.options[i]
            option.textContent = this.options[i]
            elem.appendChild(option);
        }
    }
    return elem
}


function ImageElement(src,alt)
{
    HtmlElement.call(this, "img",alt);
    this.src=src
}
ImageElement.prototype=Object.create(HtmlElement.prototype)
ImageElement.prototype.constructor=ImageElement

function SelectElement(options)
{
    HtmlElement.call(this,"select")
    this.options=options.split(",")

}
SelectElement.prototype=Object.create(HtmlElement.prototype)
SelectElement.prototype.constructor=SelectElement

function generateElement()
{
    try{
        let type=document.querySelector("#elemType").value
        let context=document.querySelector("#elemContext").value
        let element=new HtmlElement(type,context)
        let elem=element.render()
        document.body.querySelector("#image1").append(elem)
       
    }
    catch(error)
    {
        console.log(error.message)
    }
}

function generateImage()
{
    try{
        let src=document.querySelector("#elemSrc").value
        let alt=document.querySelector("#elemAlt").value
        let element=new ImageElement(src,alt)
        let elem=element.render()
        document.body.querySelector("#element1").append(elem)
    }
    catch(error)
    {
        console.log(error.message)
    }


}

function generateSelect()
{
    try
    {
        let options=document.querySelector("#select").value
        let element=new SelectElement(options)
        let elem=element.render()
        document.body.querySelector("#select1").append(elem)
    }
        catch(error)
    {
        console.log(error.message)
    }
}
