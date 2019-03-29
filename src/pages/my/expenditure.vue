<template>
    <section>
        income
    </section>
</template>
<script>
import wepy from "wepy";
export default class Expenditure extends wepy.page {
    config = {
        navigationBarTitleText: "收入明细"
    };
    data = {
        showArray:[
            {
                src:"../../images/icon_8_shouru@2x.png",
                title:"收入明细", 
            },
            {
                src:"../../images/icon_8_zhichu@2x.png",
                title:"支出明细",
            }
        ],
        pointArray:[
            {
                point:"1000",
                path:"历史德分"
            },
            {
                point:"2000",
                path:"可用德分"
            }
        ]
    };
    methods = {
        switchPage(e){
            let index = e.currentTarget.dataset.index;
            let url = '';
            url = index === 0 ? "./myGroup" : "./scanCode";
            if(url != ''){
                wx.navigateTo({
                    url,
                })
            }
        },
        toTransferAccounts(){
            wx.navigateTo({
                url: "./transferAccounts"
            })
        }
    }
}
</script>

