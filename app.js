const dishes=[
{name:'Bánh mì thịt',min:25,max:35,type:'dry',desc:'Bánh giòn, nhân đầy, thêm chút đồ chua. Gọn một ổ, no một bữa.'},
{name:'Cơm tấm sườn',min:35,max:50,type:'rice',desc:'Sườn nướng thơm, cơm tấm mềm, rưới thêm nước mắm. Một lựa chọn rất biết chiều bụng.'},
{name:'Phở bò',min:40,max:60,type:'soup',desc:'Nước dùng nóng, bánh phở mềm, thịt bò thơm. Thêm rau và chanh theo gu mày.'},
{name:'Bún thịt nướng',min:35,max:50,type:'dry',desc:'Thịt nướng, bún mát, rau tươi và đậu phộng. Trộn đều là có một bữa ăn đủ vị.'},
{name:'Cơm gà xối mỡ',min:40,max:55,type:'rice',desc:'Da gà giòn rụm, thịt mềm, cơm nóng. Hợp hôm nay muốn ăn một bữa thật đã.'},
{name:'Bún riêu',min:30,max:45,type:'soup',desc:'Nước riêu chua dịu, cà chua và đậu hũ. Một tô nóng cho lúc bụng đang đói.'},
{name:'Hủ tiếu',min:30,max:45,type:'soup',desc:'Sợi dai nhẹ, nước dùng thanh và chút hẹ thơm. Dễ ăn, dễ chốt.'},
{name:'Mì Quảng',min:35,max:50,type:'dry',desc:'Sợi mì đậm vị, rau sống và bánh tráng giòn. Ít nước mà nhiều hương vị.'},
{name:'Bún bò Huế',min:40,max:60,type:'soup',desc:'Nước dùng thơm sả, sợi bún to, thịt bò mềm. Thêm sa tế nếu đang thèm cay.'},
{name:'Cơm cá kho',min:35,max:50,type:'rice',desc:'Cá kho đậm đà, cơm trắng nóng và rau ăn kèm. Bữa ăn mang chút vị cơm nhà.'},
{name:'Xôi mặn',min:20,max:30,type:'dry',desc:'Xôi dẻo, hành phi thơm, thêm nhân mặn. Nhỏ gọn mà chắc bụng.'},
{name:'Bánh cuốn',min:25,max:35,type:'dry',desc:'Bánh cuốn mềm mỏng, hành phi giòn, chấm nước mắm. Nhẹ nhàng mà vẫn ngon miệng.'},
{name:'Cơm đậu hũ sốt cà',min:25,max:35,type:'veg',desc:'Đậu hũ mềm, sốt cà chua dịu và cơm nóng. Chọn phiên bản chay khi gọi món nhé.'},
{name:'Bún chay',min:25,max:35,type:'veg',desc:'Bún, rau tươi, đậu hũ và nước chấm chay. Một bữa ăn thanh nhẹ, nhiều màu sắc.'},
{name:'Phở nấm chay',min:35,max:50,type:'veg',desc:'Nấm thơm, bánh phở mềm và nước dùng rau củ. Ấm bụng theo cách thật nhẹ nhàng.'},
{name:'Cơm rau củ chay',min:25,max:35,type:'veg',desc:'Cơm nóng với rau củ theo mùa và đậu hũ. Mộc mạc, vừa túi, dễ ăn.'},
{name:'Cơm rang trứng',min:25,max:35,type:'rice',desc:'Cơm rang tơi, trứng thơm và chút rau củ. Cứ đơn giản vậy mà ngon.'},
{name:'Bún chả',min:40,max:60,type:'dry',desc:'Chả nướng thơm lừng, bún và rau sống. Chấm từng miếng cho bữa ăn thật thong thả.'}
];
const $=id=>document.getElementById(id);const labels={dry:'Món khô',rice:'Cơm',soup:'Món nước',veg:'Ăn chay'};let type='all',current=dishes[0],busy=false;
const photo=document.querySelector('.photo');
const foodImage=photo.querySelector('.food-art');
const photoCredit=photo.querySelector('.photo-credit');
const photoLabel=photo.querySelector('.photo-label');
let photoRequest=0;
function showPhoto(d){
  const asset=mealPhotos[d.name];
  const request=++photoRequest;
  photo.classList.add('loading-photo');
  foodImage.setAttribute('aria-label','Ảnh minh họa AI: '+d.name);
  photoLabel.textContent='ĐANG LÊN MÓN…';
  photoCredit.hidden=true;
  if(!asset){photoLabel.textContent='ẢNH MÓN ĂN ĐANG CẬP NHẬT';return;}
  const next=new Image();
  next.onload=()=>{
    if(request!==photoRequest)return;
    foodImage.style.backgroundImage=`url("${asset.url}")`;
    foodImage.style.backgroundPosition=`${asset.x}% ${asset.y}%`;
    photoLabel.textContent=d.name.toUpperCase();
    photoCredit.textContent='Ảnh minh họa AI';
    photoCredit.hidden=false;
    photo.classList.remove('loading-photo');
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      foodImage.animate([{opacity:0},{opacity:1}],{duration:350,easing:'ease-out'});
    }
  };
  next.onerror=()=>{
    if(request!==photoRequest)return;
    photoLabel.textContent='CHƯA TẢI ĐƯỢC ẢNH MÓN NÀY';
  };
  next.src=asset.url;
}
function pool(){const budget=Number($('budget').value);return dishes.filter(d=>(type==='all'||d.type===type)&&(!budget||d.max<=budget));}
function render(d,label){current=d;showPhoto(d);$('dish').textContent=d.name;$('description').textContent=d.desc;$('price').innerHTML=`${d.min}–${d.max}k <small>/ phần</small>`;$('category').textContent=labels[d.type];$('result-label').textContent=label;$('confirmed').hidden=true;$('confirm').textContent='Chốt món này ✓';}
function update(){const list=pool();$('confirm').hidden=!list.length;if(!list.length){$('dish').textContent='Chưa có món phù hợp';$('description').textContent='Tăng ngân sách một chút hoặc thử nhóm món khác nhé.';$('price').textContent='—';$('category').textContent='Thử đổi bộ lọc';$('result-label').textContent='ĐỔI GU MỘT CHÚT?';$('confirmed').hidden=true;current=null;photoRequest++;photo.classList.add('loading-photo');photoLabel.textContent='CHỌN LẠI KHẨU VỊ NHÉ';photoCredit.hidden=true;}$('count').textContent=`Có ${list.length} món hợp ý mày`;$('shuffle').disabled=busy||!list.length;if(!list.includes(current)&&list.length)render(list[0],'HỢP VỚI LỰA CHỌN CỦA MÀY');}
$('budget').addEventListener('change',update);$('types').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;type=b.dataset.value;document.querySelectorAll('#types button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));update();});
const resultCard=document.querySelector('.result');
const resultBody=document.querySelector('.result-body');
const filterButtons=[...document.querySelectorAll('#types button')];
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
$('shuffle').addEventListener('click',()=>{
  if(busy)return;
  const list=pool();
  if(!list.length)return;
  const choices=list.filter(d=>d!==current);
  const available=choices.length?choices:list;
  const selected=available[Math.floor(Math.random()*available.length)];
  if(mealPhotos[selected.name]){const preload=new Image();preload.src=mealPhotos[selected.name].url;}
  busy=true;
  $('shuffle').disabled=true;
  $('budget').disabled=true;
  filterButtons.forEach(b=>b.disabled=true);
  $('confirm').disabled=true;
  $('confirmed').hidden=true;
  resultBody.setAttribute('aria-busy','true');
  resultCard.classList.remove('revealed');
  resultCard.classList.add('spinning');
  $('shuffle').classList.add('spinning');
  $('shuffle').setAttribute('aria-label','Đang quay chọn món');
  $('shuffle').innerHTML='<span class="reel-name" aria-hidden="true">Đang quay món…</span><span class="spin-icon" aria-hidden="true">✳</span>';
  $('result-label').textContent='ĐANG QUAY… ĐỢI CHÚT NHA!';
  const finish=()=>{
    resultCard.classList.remove('spinning');
    $('shuffle').classList.remove('spinning');
    render(selected,'CHỐT KÈO! HÔM NAY ĂN MÓN NÀY!');
    resultBody.setAttribute('aria-busy','false');
    busy=false;
    $('budget').disabled=false;
    filterButtons.forEach(b=>b.disabled=false);
    $('confirm').disabled=false;
    $('shuffle').removeAttribute('aria-label');
    $('shuffle').innerHTML='Quay lại món khác <span>↻</span>';
    update();
    resultCard.classList.add('revealed');
    if(window.matchMedia('(max-width: 620px)').matches){
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        resultBody.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
      }));
    }
  };
  if(reducedMotion.matches){finish();return;}
  let tick=0;
  let last=current;
  const roll=()=>{
    const nextChoices=list.filter(d=>d!==last);
    const candidates=nextChoices.length?nextChoices:list;
    const preview=candidates[Math.floor(Math.random()*candidates.length)];
    last=preview;
    $('dish').textContent=preview.name;
    $('shuffle').querySelector('.reel-name').textContent=preview.name;
    $('dish').animate([{transform:'translateY(-12px)',opacity:.25},{transform:'translateY(0)',opacity:1}],{duration:120,easing:'ease-out'});
    tick++;
    if(tick<15){setTimeout(roll,55+Math.pow(tick/15,3)*260);}
    else{setTimeout(finish,340);}
  };
  roll();
});
$('confirm').addEventListener('click',()=>{$('confirmed').textContent=`Chốt ${current.name.toLowerCase()} nhé. Đi ăn thôi, ngon miệng!`;$('confirmed').hidden=false;$('confirm').textContent='Đã chốt ✓';});update();showPhoto(current);
