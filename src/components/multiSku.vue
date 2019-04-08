<template>

  <view class='multiSku'>
    <repeat for='{{classList}}'>
      
      <view class='sku_class'>

        <view class='sku_name s_fc_2'>{{item.name}}</view>

        <view class='sku_item_wrap'>
          <repeat for='{{item.items}}' item='sku' index='i'>

            <view class="sku_item {{ sku.isNull ? 's_fc_4 s_bg_4' : (selArr[index] === i ? 'sku_sel s_fc_3 s_bg_3' : 's_fc_2 s_bg_2') }}" @tap='click({{index}}, {{i}})'>{{sku.name}}</view>

          </repeat>
        </view>

      </view>

    </repeat>
  </view>
  
</template>
<script>
import wepy from 'wepy';

export default class multiSKu extends wepy.component {
  props = {
    // sku Array
    classList: {
      default: [] 
    },
    // goods
    skus: {
      default: []
    },
    field: {
      default: {
        price: 'price',
        amount: 'amount',
      }
    }
  }
  data = {
    selArr: [],
    skuClassArr: [], // sku array
    price: {
      min: Infinity,
      max: 0,
    },
    skuStr: '', // sku 
  }

  watch = {
    classList(v1, v2){
      // init selArr
      if(this.selArr.length !== v1.length) this.selArr = v1.map(v => -1);
    },
    skus(v1, v2){

      // this.classList.forEach(v => v.items.forEach(sku => sku.isNull = false));
      this.skuClassArr = this.classList.map(v => v.items);

      let arr = this.formatArray(v1, this.skuClassArr);
      // console.error('format after', v1, v2, arr, this.skuClassArr);
      this.checkAmount();
    }
  }

  events = {

  }

  methods = {

    click(index, i){
      let skuStr,  indexArr, img, goods,
          price = this.price;

      // handle amount is null
      if(this.classList[index].items[i].isNull) return ;

      this.selArr[index] =  this.selArr[index] === i ? -1 : i;

      // sku desc text
      skuStr = this.selArr.map((v, i) => { return v !== -1 ? this.skuClassArr[i][v].name : '' }).join().replace(/,+/g, ',').replace(/^,|,$/g, '');
      skuStr = skuStr == '' ? '请选择规格' : `已选择"${skuStr}"`;

      indexArr = this.findArray(this.skus.map(v => v.list), this.selArr);
      // console.error(index, i, `selArr: ${this.selArr}`, `indexArr:${indexArr}`, this.skus.map((v, i) => `${i}-${v[this.field.amount]}`) );

      let priceArr = indexArr.map((v, i) => { return this.skus[v][this.field.price] });
      price = this.getPrice(priceArr);

      img = this.skus[indexArr[0]].skuImgUrl;

      // Get Goods
      if(indexArr.length === 1){ goods = this.skus[indexArr[0]]; }
      // console.error(price, skuStr);
      this.$emit('update', price, skuStr, img, goods);

      // Check amount
      this.checkAmount(index);
      
    },

  }

  onLoad() {
  }

  checkAmount(clickIndex){
    let field = this.field.amount;

      if(this.selArr.filter(v => v === -1).length === 0){
        let selArr, matchArr;

        this.selArr.forEach((v, i) => {

            this.skuClassArr[i].forEach((sku, skuIndex) => {
              let sel_arr = this.selArr.slice();
              sel_arr[i] = skuIndex;

              let matchArr = this.findArray(this.skus.map(goods => goods.list), sel_arr);

              this.classList[i].items[skuIndex].isNull = matchArr.every(goodsIndex => this.skus[goodsIndex][field] <= 0);
              // this.classList[i].items[skuIndex].isNull = matchArr.every(goodsIndex => this.skus[goodsIndex].amount <= this.skus[goodsIndex].secureAmount);
              // console.error(`i:${i}skuIndex:${skuIndex}`, selArr, sel_arr, matchArr, this.classList[i].items[skuIndex].isNull);
            });

        })   

        return ; //console.error('all sel change', selArr, matchArr);
      }

      this.selArr.forEach((v, i) => {
        if(v === -1) {

          this.skuClassArr[i].forEach((sku, skuIndex) => {
            let selArr = this.selArr.slice();
            selArr[i] = skuIndex;

            let matchArr = this.findArray(this.skus.map(goods => goods.list), selArr);

            this.classList[i].items[skuIndex].isNull = matchArr.every(goodsIndex => this.skus[goodsIndex][field] <= 0);
            // this.classList[i].items[skuIndex].isNull = matchArr.every(goodsIndex => this.skus[goodsIndex].amount <= this.skus[goodsIndex].secureAmount);
            // console.error(`i:${i}skuIndex:${skuIndex}`, this.selArr, selArr, matchArr, this.skus.map(goods => goods[field]));
          });

        }
      });

      // global amount check
      this.selArr.forEach((v, i) => {
        this.skuClassArr[i].forEach((sku, skuIndex) => {
          let selArr = this.selArr.map(v => -1);
          selArr[i] = skuIndex;

          let matchArr = this.findArray(this.skus.map(goods => goods.list), selArr);

          let isNull = matchArr.every(goodsIndex => this.skus[goodsIndex][field] <= 0);
          if(isNull) this.classList[i].items[skuIndex].isNull = true;
        });
      });
      
  }

  getPrice(priceArr){
    let price = this.price;

    price.min = Math.min.apply(null, priceArr);
    price.max = Math.max.apply(null, priceArr);

    return price.min == price.max ? price.min : `${price.min}-${price.max}`;
  }

  formatArray(arr, arr2){
    arr.forEach((v, index) => {
      let list;

      if(index === 0) return v.list = arr2.map(v => 0);

      list = arr[index - 1].list.slice();

      // set list
      for(let i = arr2.length - 1; i >= 0; i--){

        if(list[i] < arr2[i].length - 1){
          list[i]++;
          break;
        }

        list[i] = 0;
      }

      v.list = list;

    });

    return arr;

  }

  // get index array of has one of arr2
  findArray(arr, arr2){

    return arr.map((v, i) => {
      return this.equal(v, arr2) ? i : -1;
    }).filter(v => v !== -1); 

  }

  equal(arr, arr2){
    let isEqual = true;

    for(let i = arr2.length - 1; i >= 0; i--){
      if(arr2[i] !== -1 && arr[i] !== arr2[i]){ isEqual = false; }
    }

    return isEqual;
  }

  clear(){
    this.selArr = [];
  }

}

</script>
<style scoped>
.multiSku{
  font-family: "PingFangSC-Regular"; 
}

.sku_name{
  height: 56rpx;
  line-height: 56rpx;
  font-size: 24rpx;
  font-weight: bold;
}

.sku_item_wrap{
  display: flex; 
  flex-wrap: wrap;
  padding-bottom: 30rpx;
  border-bottom: 2rpx solid #F0F0F0; 
}
.sku_item{
  flex-shrink: 0;
  min-width: 120rpx;
  height: 56rpx;
  line-height: 56rpx;
  margin: 0 40rpx 10rpx 0;
  padding: 0 10rpx;
  border: 2rpx solid transparent;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}

.sku_sel{
  border: 2rpx solid #E93B1E;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #282828; }
.s_fc_3{ color: #E93B1E; }
.s_fc_4{ color: #DCDCDC; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #F6F6F6; }
.s_bg_3{ background: #FCEEEE; }
.s_bg_4{ background: #F6F6F6; }
</style>
