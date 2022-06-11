'use strict'

let items=[{name:'Chawarma', price:4, imgUrl:"./images/chawarma.jpg" ,nbreOfItems: 0},
          {name:'Makloub', price:5, imgUrl:"./images/makloub.jpg" ,nbreOfItems: 0},
          {name:'Baguette', price:5.5, imgUrl:"./images/baguette.jpeg" ,nbreOfItems: 0},
          {name:'Pizza', price:6.5, imgUrl:"./images/pizza.jpeg" ,nbreOfItems: 0},
          {name:'Spaghetti', price:7.5, imgUrl:"./images/spaghetti.jpg" ,nbreOfItems: 0},
          {name:'Kouskous', price:7.8, imgUrl:"./images/kouskous.jpg" ,nbreOfItems: 0},
          {name:'Poisson', price:12.5, imgUrl:"./images/poisson.jpg" ,nbreOfItems: 0}];


let j=0;
let card=[];let add=[]; let basket=[];

//display items
function displayItems()
  {let cards='';j=0;
     for (let item of items)
         {cards+=`<div class='card' id="card${j}">`+
         `<div class='img'> <img  class='img0' src=${item.imgUrl}><div class='add' id='add${j}' onclick="addItemToBasket(${j})"></div> </div>`+
        `<p class='name'>${item.name}</p><p class='price'>prix: ${item.price}dt</p>`+
         "<div class='nbreOfItems'>"+
         `<div> <button class='B0' onClick="reduceNbrOfItems(${j})">-</button> </div>`+
         ` <div> <p class='nbr' id='nbr${j}'>${item.nbreOfItems}</p> </div>`+
         `<div> <button class='B1' onClick="addNbrOfitems(${j})"'>+</button>  </div> </div></div>`;
         let addNewItem=`<div class="card"><div class='add' onclick="displayNewItemForm()" style="height: 100%;display: block;"></div></div>`;
         document.getElementById('elemnts').innerHTML= cards+addNewItem;j++;}
    displayAddToBasket()
   }
displayItems()

//assign button + - items 
function addNbrOfitems(i){
     if(items[i].nbreOfItems<10) 
        {items[i].nbreOfItems++;
        document.getElementById(`nbr${i}`).innerHTML=`${items[i].nbreOfItems}`}
    } 
    
function reduceNbrOfItems(i){
      if(items[i].nbreOfItems>0)
         {items[i].nbreOfItems--;
         document.getElementById(`nbr${i}`).innerHTML=`${items[i].nbreOfItems}`} 
     }  

//ajouter au panier
function displayAddToBasket()
{for (let i=0;i<j;i++)
  {card[i]=document.getElementById(`card${i}`);
      card[i].addEventListener('mouseenter',e=>
        document.getElementById(`add${i}`).style="display:block")
      card[i].addEventListener('mouseleave',e=>
        document.getElementById(`add${i}`).style="display:none")
  }}

function addItemToBasket(i){
  if (items[i].nbreOfItems>0)
    {let nouveau=false;
      for (let l=0;l<basket.length;l++)
         {if(basket[l].name===items[i].name){basket[l].nbreOfItems+=items[i].nbreOfItems;
                   updateNmbOrder(i);
                    updateBasket(); 
                   break}
          else if(l===basket.length-1) {nouveau=true}
         }
      if(nouveau===true||basket.length===0)
          {basket.push({name:items[i].name,price:items[i].price,nbreOfItems:items[i].nbreOfItems});
          updateNmbOrder(i);updateBasket()}   
    }
 else {alert('Veuillez entrer une quantité supérieure à 0')}
 }

 function updateNmbOrder(i){
    items[i].nbreOfItems=0; document.getElementById(`nbr${i}`).innerHTML=`${items[i].nbreOfItems}`;
  }

function updateBasket(){
  let basketElmnt="";let Tot=0;let k=0;
  if(basket.length>0)
     {for(let elmt of basket)
         {basketElmnt+=`<tr><td class="xP" onclick="deleteBasketItem(${k})">X</td><td>${elmt.name}</td>  <td>x${elmt.nbreOfItems}</td> <td> ${elmt.price}dt </td> <td> ${elmt.nbreOfItems*elmt.price}dt </td></tr>`;
          Tot+=elmt.nbreOfItems*elmt.price;
          let tableHeader=`<tr class="tableHeader"><td></td><td><p>Produit</p></td>  <td><p>Nombre</p></td> <td><p>Prix unité</p></td> <td><p>Prix</p></td></tr>`;
          document.getElementById('panier').innerHTML='<table class="table">'+tableHeader+basketElmnt+'</table>'+`<p>prix totale ${Tot}dt</p>`+
             `<button class="commander"  onclick="displayOrderForm()">Commander</button>`;k++}
     }
  else{document.getElementById('panier').innerHTML="";
      document.getElementById(`panier`).style="display:none";hide=true}   
}  

//supprimer du panier
function deleteBasketItem(i){
basket.splice(i,1);updateBasket();
}

//Display Basket
let hide=true;
function dispBasket(){
    if (hide&&basket.length>0)
       {document.getElementById(`panier`).style="display:block";hide=!hide}
    else if(basket.length>0)
        {document.getElementById(`panier`).style="display:none";hide=!hide}
}

document.getElementById('pos').addEventListener('mouseenter',e=>
       {if (hide&&basket.length>0)
         { document.getElementById(`panier`).style="display:block"}}
    )
document.getElementById('pos').addEventListener('mouseleave',e=>
        {if (hide&&basket.length>0)
          {document.getElementById(`panier`).style="display:none"}}
    )

//Display Order Form
function displayOrderForm(){
       document.getElementById(`orderForm`).style="display:block";hideOrderForm=!hideOrderForm;
       document.getElementById(`elemnts`).style="height:calc(100vh - 50px);overflow:hidden;min-height:400px";}

function hideFormOrder(){
     document.getElementById(`orderForm`).style="display:none";hideOrderForm=!hideOrderForm;
     document.getElementById(`elemnts`).style="height:unset;overflow:unset;min-height:unset";}

//Pass Order
let hideOrderForm=true;
function confirmOrder(){dispBasket();basket=[];
  updateBasket();get('panier').style="display:none";
  alert(`Merci ${get('name').value} votre commande vous sera livré à ${get('adress').value} ${get('zip').value} le plus tot possible`);
}

//Display adding New Item Form
function displayNewItemForm(){
  document.getElementById('AddNewItemForm').style="display:block";
  document.getElementById(`elemnts`).style="height:calc(100vh - 50px);overflow:hidden;min-height:400px"}
function hideNewItemForm(){
 document.getElementById('AddNewItemForm').style="display:none"
 document.getElementById(`elemnts`).style="height:unset;overflow:unset;min-height:unset";}

function get(id){return document.getElementById(id)};
function addNewItem(){
items.push({name:get('product').value, price:get('price').value, imgUrl:get('imgUrl').value ,nbreOfItems: 0});
hideNewItemForm();displayItems();
}
