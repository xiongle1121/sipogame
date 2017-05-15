<template>
	 <div class="right-container">
        <!--语音排行榜 中间内容-->
        <div class="center-container rank-center">
            <div class="center-content">
                <el-form :model="voiceRankForm" :rules="voiceRankRule" ref="voiceRankForm">
                    <el-form-item label="销售量" prop="saleRank">
                      <el-select v-model="voiceRankForm.saleRank">
                      	<el-option label="由高到低" value="1"></el-option>
                      	<el-option label="由低到高" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="nickName" class="equip-input">
                      <el-input v-model="voiceRankForm.nickName" placeholder="请输入用户昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间">
                      <el-date-picker v-model="voiceRankForm.publishTime" type="daterange" placeholder="请选择日期范围" :picker-options="rankTime" @change="getDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" @click="searchRecord('voiceRankForm')">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--右侧内容   语音排行榜-->
        <div class="voice-rank">
        	<div class="rank-content-tit">语音排行榜</div>
        	<div class="rank-table-tit">
        		<span class="rank-tit">语音排名</span>
        		<span class="rank-user">用户</span>
        		<span class="rank-sale">语音销售量</span>
        		<span class="rank-time">发布时间</span>
        		<span class="rank-listen">点击试听</span>
        		<span class="rank-operate">操作</span>
        	</div>
        	<div class="rank-table-body">
        		<ul>
        			<li v-for="(item,index) in rankList">
        				<span class="rank-tit">
        					<em class="rank-num" :class="[{num1: index==0},{num2: index==1},{num3: index==2}]">{{index+1}}</em>
        				</span>
		        		<span class="rank-user">
		        			<em><img :src="baseUrl+item.userPhoto">{{item.userName}}</em>
		        		</span>
		        		<span class="rank-sale">
		        			<em>{{item.sale}}</em>
		        		</span>
		        		<span class="rank-time">
		        			<em>{{item.publishTime}}</em>
		        		</span>
		        		<span class="rank-listen">
		        			<em>
		        				<img src="../../../static/img/voice-listen.png" height="33" width="75">
		        				<!-- <audio src="" preload controls></audio> -->
		        			</em>
		        		</span>
		        		<span class="rank-operate">
		        			<em @click="dismiss" class="dismissBtn">撤销</em>
		        		</span>
        			</li>
        		</ul>
        	</div>
        	<div class="pagination">
        		<em class="prev-btn"></em>
        		<span class="pagination-page"><em>1</em>/<em>30</em></span>
        		<em class="next-btn"></em>
        	</div>
        </div>
    </div>
</template>

<script>
	export default{
		data(){
			return {
				rankTime: {
					// 设置最大、最小日期
					disabledDate(time){
						let bool = false;
						(time.getTime() > Date.now() ) && (bool = true);
						(time.getTime() < new Date(2017, 2, 31, 8).getTime() ) && (bool = true);
						return bool;
					},
					//设置快捷方式
					shortcuts: [{
						'text': '最近一周',
						 onClick(picker){
							const end = new Date();
							const start = new Date();
							start.setTime( start.getTime() -3600*1000*24*7 );
							picker.$emit( 'pick', [start, end]);
						 }
					},{
						text: '最近一个月',
						onClick(picker){
							const end = new Date();
							const start = new Date();
							start.setTime( start.getTime() - 3600*1000*24*30 );
							picker.$emit( 'pick', [start, end]);
						}
					}]
				},
				voiceRankForm:{
					saleRank: '',
					nickName: '',
					publishTime:''
					// publishStartTime: '',
					// publishEndTime:''
				},
				voiceRankRule:{
					saleRank: [
						{ required: true, message: '请选择排序方式', trigger: 'change'}
					],
					nickName: [
						{ required: true, message: '请输入昵称', trigger: 'blur'}
					],
					publishTime: [
						{ required: true, message: '请选择时间段', trigger: 'blur'}
					]
				},
				baseUrl: '../../../static/img/',
				rankList:[
					{rank:1, userPhoto:'userPhoto.png', userName:'菜包子',  sale:'2300', publishTime:'2017.4.6'},
					{rank:2, userPhoto:'userPhoto.png', userName:'菜包子',  sale:'1800', publishTime:'2017.4.1'},
					{rank:3, userPhoto:'userPhoto.png', userName:'菜包子',  sale:'1600', publishTime:'2017.4.5'},
					{rank:4, userPhoto:'userPhoto.png', userName:'菜包子',  sale:'1000', publishTime:'2017.4.4'},
					{rank:5, userPhoto:'userPhoto.png', userName:'菜包子',  sale:'800', publishTime:'2017.4.3'}
				]
			}
		},
		methods: {
			// 获取日期时间段
			getDate(val){
				// console.log(val);
			},
			dismiss(){}
		}
	}
</script>
<style>
	.rank-center .el-form-item,.check-center .el-form-item{
		margin-bottom:10px;
	}
	.rank-center .el-form-item__label,.check-center .el-form-item__label{
		padding-bottom:18px;
	}
	.pagination{
		position:absolute;
		left:50%;
		transform:translateX(-50%);
		height:22px;
		line-height:22px;
	}
	.pagination .prev-btn,.pagination .next-btn{
		display:inline-block;
		width:20px;
		height:22px;
		background:url('../../../static/img/rank-leftBtn.png') no-repeat 0 0;
		background-size:contain;
		vertical-align:middle;
		cursor:pointer;
	}
	.pagination .next-btn{
		background-image:url('../../../static/img/rank-rightBtn.png');
	}
	.pagination .next-btn:hover{
		background-image:url('../../../static/img/rank-rightBtn-on.png');
	}
	.pagination .prev-btn:hover{
		background-image:url('../../../static/img/rank-leftBtn-on.png');
	}
</style>
<style scoped>
	.rank-center{
		width:260px;
	}
	.rank-center .center-content{
		margin:10px 0 0 20px;	
	}
	.rank-center .el-button{
		margin-top:15px;
	}
	.voice-rank{
		position:relative;
		margin-left:260px;
		height:100%;
		box-sizing:border-box;
		padding:20px 40px 40px 0;
	}
	.rank-content-tit{
		font-size:18px;
		text-align:center;
		font-weight:500;
		letter-spacing:1px;
		height:40px;
		line-height:40px;
		margin-bottom:10px;
		border-radius:10px;
		background-color:rgba(29,29,29,.5);
	}
	.rank-table-tit{
		padding:0 10px;
		height:34px;
		line-height: 34px;
		background-color:rgba(255,255,255,.16);
		border-radius:10px;
		margin-bottom:10px;
	}
	.rank-table-body{
		position:absolute;
		left:0;
		right:40px;
		top:114px;
		bottom:30px;
		padding:7px 10px 0;
		background-color:rgba(255,255,255,.18);
		border-radius:10px;
		color:#212121;
	}
	.rank-table-body li{
		height:70px;
		line-height:70px;
		margin-bottom:6px;
		border-radius:10px;
		background-color:#fff;
	}
	.rank-tit,.rank-user,.rank-sale,.rank-time,.rank-listen,.rank-operate{
		float:left;
		height:100%;
		text-align:center;
	}
	.rank-tit{
		width:10%;
	}
	.rank-tit .rank-num{
		display:inline-block;
		width:36px;
		height:36px;
		line-height:36px;
		border-radius:50%;
		font-size:18px;
		color:#fff;
		font-weight:bold;
		background-color:#0c0202;
	}
	.rank-tit .rank-num.num1{
		background-color:#df7b2d;
	}
	.rank-tit .rank-num.num2{
		background-color:#2d74df;
	}
	.rank-tit .rank-num.num3{
		background-color:#df2d2d;
	}
	.rank-user,.rank-sale,.rank-time{
		width:16%;
	}
	.rank-user img{
		width:48px;
		height:48px;
		border-radius:10px;
		margin-right:12px;
	}
	.rank-listen{
		width:30%;
	}
	.rank-listen em{
		display:inline-block;
		width:75px;
		height:33px;
		margin-top:19px;
		position:relative;
	}
	.rank-listen img{
		position:absolute;
		left:0;
		top:0;
	}
	.rank-operate{
		width:12%;
	}
	.dismissBtn{
		display:inline-block;
		width:77px;
		height:36px;
		line-height:36px;
		border-radius:10px;
		color:#fff;
		background-color:#cd6c6c;
		cursor:pointer;
	}
	.pagination{
		bottom:45px;
	}
	.pagination .pagination-page{
		display:inline-block;
		vertical-align:top;
		font-size:18px;
		margin:0 40px;
		letter-spacing:4px;
	}
	.pagination .pagination-page em{
		padding:0 8px;
	}
</style>