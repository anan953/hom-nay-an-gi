const dishes=[
{name:'Bánh mì thịt',min:25,max:35,type:'dry',desc:'Bánh giòn, nhân đầy, thêm chút đồ chua. Gọn một ổ, no một trưa.'},
{name:'Cơm tấm sườn',min:35,max:50,type:'rice',desc:'Sườn nướng thơm, cơm tấm mềm, rưới thêm nước mắm. Một lựa chọn rất biết chiều bụng.'},
{name:'Phở bò',min:40,max:60,type:'soup',desc:'Nước dùng nóng, bánh phở mềm, thịt bò thơm. Thêm rau và chanh theo gu mày.'},
{name:'Bún thịt nướng',min:35,max:50,type:'dry',desc:'Thịt nướng, bún mát, rau tươi và đậu phộng. Trộn đều là có một bữa trưa đủ vị.'},
{name:'Cơm gà xối mỡ',min:40,max:55,type:'rice',desc:'Da gà giòn rụm, thịt mềm, cơm nóng. Hợp hôm nay muốn ăn một bữa thật đã.'},
{name:'Bún riêu',min:30,max:45,type:'soup',desc:'Nước riêu chua dịu, cà chua và đậu hũ. Một tô nóng cho buổi trưa đang đói.'},
{name:'Hủ tiếu',min:30,max:45,type:'soup',desc:'Sợi dai nhẹ, nước dùng thanh và chút hẹ thơm. Dễ ăn, dễ chốt.'},
{name:'Mì Quảng',min:35,max:50,type:'dry',desc:'Sợi mì đậm vị, rau sống và bánh tráng giòn. Ít nước mà nhiều hương vị.'},
{name:'Bún bò Huế',min:40,max:60,type:'soup',desc:'Nước dùng thơm sả, sợi bún to, thịt bò mềm. Thêm sa tế nếu đang thèm cay.'},
{name:'Cơm cá kho',min:35,max:50,type:'rice',desc:'Cá kho đậm đà, cơm trắng nóng và rau ăn kèm. Bữa trưa mang chút vị cơm nhà.'},
{name:'Xôi mặn',min:20,max:30,type:'dry',desc:'Xôi dẻo, hành phi thơm, thêm nhân mặn. Nhỏ gọn mà chắc bụng.'},
{name:'Bánh cuốn',min:25,max:35,type:'dry',desc:'Bánh cuốn mềm mỏng, hành phi giòn, chấm nước mắm. Nhẹ nhàng mà vẫn ngon miệng.'},
{name:'Cơm đậu hũ sốt cà',min:25,max:35,type:'veg',desc:'Đậu hũ mềm, sốt cà chua dịu và cơm nóng. Chọn phiên bản chay khi gọi món nhé.'},
{name:'Bún chay',min:25,max:35,type:'veg',desc:'Bún, rau tươi, đậu hũ và nước chấm chay. Một bữa trưa thanh nhẹ, nhiều màu sắc.'},
{name:'Phở nấm chay',min:35,max:50,type:'veg',desc:'Nấm thơm, bánh phở mềm và nước dùng rau củ. Ấm bụng theo cách thật nhẹ nhàng.'},
{name:'Cơm rau củ chay',min:25,max:35,type:'veg',desc:'Cơm nóng với rau củ theo mùa và đậu hũ. Mộc mạc, vừa túi, dễ ăn.'},
{name:'Cơm rang trứng',min:25,max:35,type:'rice',desc:'Cơm rang tơi, trứng thơm và chút rau củ. Cứ đơn giản vậy mà ngon.'},
{name:'Bún chả',min:40,max:60,type:'dry',desc:'Chả nướng thơm lừng, bún và rau sống. Chấm từng miếng cho bữa trưa thật thong thả.'}
];
const $=id=>document.getElementById(id);const labels={dry:'Món khô',rice:'Cơm',soup:'Món nước',veg:'Ăn chay'};let type='all',current=dishes[0],busy=false;
function pool(){const budget=Number($('budget').value);return dishes.filter(d=>(type==='all'||d.type===type)&&(!budget||d.max<=budget));}
function render(d,label){current=d;$('dish').textContent=d.name;$('description').textContent=d.desc;$('price').innerHTML=`${d.min}–${d.max}k <small>/ phần</small>`;$('category').textContent=labels[d.type];$('result-label').textContent=label;$('confirmed').hidden=true;$('confirm').textContent='Chốt món này ✓';}
function update(){const list=pool();$('count').textContent=`Có ${list.length} món hợp ý mày`;$('shuffle').disabled=busy||!list.length;if(!list.includes(current)&&list.length)render(list[0],'HỢP VỚI LỰA CHỌN CỦA MÀY');}
$('budget').addEventListener('change',update);$('types').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;type=b.dataset.value;document.querySelectorAll('#types button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));update();});
$('shuffle').addEventListener('click',()=>{if(busy)return;const list=pool();if(!list.length)return;busy=true;$('shuffle').disabled=true;$('shuffle').innerHTML='Đang chọn món… <span>✳</span>';setTimeout(()=>{const choices=list.filter(d=>d!==current);const available=choices.length?choices:list;render(available[Math.floor(Math.random()*available.length)],'TRƯA NAY, ĂN MÓN NÀY!');busy=false;$('shuffle').innerHTML='Chọn lại món khác <span>↻</span>';update();},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:380);});
$('confirm').addEventListener('click',()=>{$('confirmed').textContent=`Chốt ${current.name.toLowerCase()} nhé. Đi ăn thôi, ngon miệng!`;$('confirmed').hidden=false;$('confirm').textContent='Đã chốt ✓';});update();
