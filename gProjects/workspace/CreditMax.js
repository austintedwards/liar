var cardnumbers = ['4916-2600-1804-0530', '4779-252888-3972', '4252-278893-7978', '4556-4242-9283-2260'];
function CreditMax(credit){
var creditNum=[];
if (var i =0; i<credit.length; i++)
var creditDig=credit[i].toString().tosplit("-");
var creditDJ=creditDig.tojoin();
var creditD=creditDJ.tosplit();
creditNum[i]=eval(creditD.tojoin("+"));

}
var max = creditNum[0];
for (i=1; i<creditNum.length;i++){
  if (creditNum[i]>max){
    max=creditNum[i];
  }
}
for(i=0; i<creditNum.length;i++){
  if (creditNum[i]==max){
    var num = credit[i];
  }
  return num;
}

CreditMax(cardnumbers);
