<template>
	<div class="right-container">
        <!--语音审核 中间内容-->
        <div class="center-container check-center">
        	<div class="check-result">
        		<div class="result-content">
        			<p>语音条目 : <strong>100</strong></p>
        			<p>已通过语音 : <strong class="passColor">20</strong></p>
        			<p>已否决语音 : <strong class="voteColor">80</strong></p>
        		</div>
        	</div>
            <el-form :model="voiceCheckForm" :rules="voiceCheckRule" ref="voiceCheckForm">
            	<el-form-item label="用户昵称" prop="nickName" class="equip-input">
                  <el-input v-model="voiceCheckForm.nickName" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="审核状态" prop="checkCondition">
                  <el-select v-model="voiceCheckForm.checkCondition" :class="selectColor" @change="changeColor">
                  	<el-option label="已通过" value="1" class="passColor"></el-option>
                  	<el-option label="已否决" value="2" class="voteColor"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发布时间">
                  <el-date-picker v-model="voiceCheckForm.publishTime" type="daterange" placeholder="请选择日期范围" @change="getDate" :picker-options="checkTime"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="searchRecord('voiceCheckForm')">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 语音审核  右侧内容 -->
        <div class="vioce-check">
        	<div class="check-content-top">
        		<ul class="check-operate-list">
        			<li v-for="item in checkList">
        				<div class="user-name">{{item.userName}}</div>
        				<div class="user-voice">
        					用户语音 : 
        					<img src="../../../static/img/voice-white-listen.png">
        				</div>
        				<div class="voice-price">
        					语音价格 : 
        					<em>&yen; {{item.voicePrice}}</em>
        				</div>
        				<div class="voice-publishTime">
        					发布时间 :
        					<em>{{item.publishTime}}</em>
        				</div>
        				<div class="voice-operate-btn">
        					<em><img src="../../../static/img/passBtn.png"></em>
        					<em><img src="../../../static/img/voteBtn.png"></em>
        				</div>
        			</li>
        		</ul>
        		<el-button type="success" class="submitBtn">提交</el-button>
        	</div>
        	<div class="check-content-bottom">
        		<div class="check-table-tit">
        			<span class="table-user-name">用户名</span>
        			<span class="table-user-voice">用户语音</span>
        			<span class="table-voice-publishTime">发布时间</span>
        			<span class="table-voice-price">语音价格</span>
        			<span class="table-voice-checkCondition">审核状态</span>
        			<span class="table-voice-operate">状态操作</span>
        		</div>
        		<ul class="check-table-body">
        			<li>
        				<span class="table-user-name">
	        				<em>菜包子</em>
	        			</span>
	        			<span class="table-user-voice">
	        				<img src="../../../static/img/voice-white-listen.png">
	        			</span>
	        			<span class="table-voice-publishTime">
	        				<em>2017.04.20</em>
	        			</span>
	        			<span class="table-voice-price">
	        				<em>&yen;30.00</em>
	        			</span>
	        			<span class="table-voice-checkCondition">
	        				<em class="passColor">已通过</em>
	        			</span>
	        			<span class="table-voice-operate">
	        				<em class="voteBgColor">撤销</em>
	        			</span>
        			</li>
        			<li>
        				<span class="table-user-name">
	        				<em>菜包子</em>
	        			</span>
	        			<span class="table-user-voice">
	        				<img src="../../../static/img/voice-white-listen.png">
	        			</span>
	        			<span class="table-voice-publishTime">
	        				<em>2017.04.20</em>
	        			</span>
	        			<span class="table-voice-price">
	        				<em>&yen;30.00</em>
	        			</span>
	        			<span class="table-voice-checkCondition">
	        				<em class="voteColor">否决</em>
	        			</span>
	        			<span class="table-voice-operate">
	        				<em class="passBgColor">通过</em>
	        			</span>
        			</li>
        		</ul>
        		<div class="pagination">
	        		<em class="prev-btn"></em>
	        		<em class="next-btn"></em>
	        	</div>
        	</div>
        </div>
    </div>    
</template>

<script>
	export default {
		data() {
			return {
				// 日期范围选项设置
				checkTime: {
					// 设置日期选择范围
					disabledDate(time){
						let bool = false;
						( time.getTime() > new Date() )&&( bool = true);
						( time.getTime() < new Date(2017, 2, 31, 8).getTime() )&&( bool = true);
						return bool;
					},
					// 快捷方式设置
					shortcuts: [{
						'text': '最近一周',
						onClick(picker){
							const end = new Date();
							const start = new Date();
							start.setTime( start.getTime() - 3600*1000*24*7);
							picker.$emit( 'pick', [start, end] );
						}
					},{
						'text': '最近一个月',
						onClick(picker){
							const end = new Date();
							const start = new Date();
							start.setTime( start.getTime() - 3600*1000*24*30);
							picker.$emit( 'pick', [start, end] );
						}
					}]
				},
				voiceCheckForm:{
					nickName: '',
					checkCondition: '',
					publishTime: ''
				},
				voiceCheckRule:{
					nickName: [ 
						{required: true, message: '请输入用户昵称！',trigger: 'blur'} 
					],
					checkCondition: [ 
						{required: true, message: '请选择审核状态！',trigger: 'change'}
					],
					publishTime: [
						{required: true ,message: '请选择发布时间！',trigger: 'change'}
					]
				},
				selectColor:'' ,
				checkList: [
					{userName: '菜包子', voicePrice: '30.00', publishTime: '2017-04-20'},
					{userName: '菜包子', voicePrice: '30.00', publishTime: '2017-04-20'},
					{userName: '菜包子', voicePrice: '30.00', publishTime: '2017-04-20'},
					{userName: '菜包子', voicePrice: '30.00', publishTime: '2017-04-20'},
					{userName: '菜包子', voicePrice: '30.00', publishTime: '2017-04-20'},
					{userName: '菜包子', voicePrice: '30.00', publishTime: '2017-04-20'}
				]
			}
		},
		methods:{
			changeColor(value){
				if(value == 1){
					this.selectColor = 'passColor';
				}else if(value == 2){
					this.selectColor = 'voteColor';
				}
			},
			getDate(val){
				console.log(val);
			},
			searchRecord(){

			}
		}
	}
</script>
<style>
	.check-center .el-select .el-input__inner{
		color:inherit;
	}
</style>
<style scoped>
	.passColor{
		color:#72eca9;
		/*color:#4bbb4b;*/
	}
	.voteColor{
		color:#ec7272;
	}
	.passBgColor{
		background-color:#4bbb4b;
	}
	.voteBgColor{
		background-color:#ec7272;
	}
	.check-center{
		width:238px; 
	}
	.check-result{
		width:216px;
		height:316px;
		margin:20px auto;
		border-radius:10px;
		background-color:rgba(0,0,0,.2);
	}
	.check-result .result-content{
		padding:88px 0 0 42px;
		font-size:14px;
	}
	.check-result .result-content p{
		height:24px;
		line-height: 24px;
		margin-bottom:22px;
	}
	.check-result .result-content p strong{
		font-weight:500;
		font-size:24px;
		vertical-align:top;
	}
	.check-center .el-form{
		margin-left:9px;
	}
	.vioce-check{
		position:relative;
		box-sizing:border-box;
		margin-left:238px;
		height:100%;
		padding:20px 40px 20px 0;
	}
	.check-content-top{
		width:100%;
		height:316px;
		background-color:rgba(0,0,0,.2);
		border-radius:10px;
		margin-bottom:20px;
		min-width:1380px;
	}
	.check-operate-list{
		padding:29px 20px 19px;
	}
	.check-operate-list li{
		position:relative;
		float:left;
		width:167px;
		padding-left:25px;
		height:268px;
		margin-right:20px;
		background-color:rgba(255,255,255,.2);
		border-radius:10px;
	}
	.check-operate-list .user-name{
		position:absolute;
		left:50%;
		margin-left:-71px;
		top:-10px;
		width:102px;
		padding:0 20px;
		height:26px;
		text-align:center;
		line-height: 26px;
		background-color:#fff;
		border-radius:10px;
		color:#666;
	}
	.check-operate-list .user-voice{
		height:30px;
		line-height: 30px;
		margin:34px 0 20px;
	}
	.check-operate-list .voice-price{
		margin-bottom: 25px;
	}
	.check-operate-list .voice-operate-btn{
		position:absolute;
		bottom: 7px;
		right: 8px;
	}
	.check-operate-list .voice-operate-btn em{
		display:inline-block;
		width: 26px;
		height: 26px;
		margin-left: 16px;
	}
	.submitBtn{
		margin-top: 88px;
	}

	.check-content-bottom{
		position:absolute;
		left:0;
		right:40px;
		bottom:20px;
		top:356px;
	}
	.check-table-tit,.check-table-body{
		padding:0 20px;
		border-radius:10px;
		background-color:#1d1d1d;
	}
	.check-table-tit{
		height:32px;
		line-height: 32px;
		font-size: 14px;
		margin-bottom:5px;
	}
	.check-table-body{
		position:absolute;
		left:0;
		right:0;
		bottom:0;
		top:41px;
		padding-top:10px;
	}
	.check-table-body li{
		height:48px;
		line-height: 48px;
		border-radius:10px;
		background-color:rgba(255,255,255,.4);
		margin-bottom: 5px;
		font-size:14px;
	}
	.table-user-name,.table-voice-publishTime,.table-voice-price,.table-user-voice,.table-voice-checkCondition,.table-voice-operate{
		float:left;
		height:100%;
		text-align:center;
		letter-spacing:2px;
	}
	.table-user-name{
		width:8%;
	}
	.table-voice-publishTime,.table-voice-price,.table-voice-operate{
		width:10%;
	}
	.table-user-voice{
		width:15%;
	}
	.table-voice-checkCondition{
		width:47%;
	}
	.table-voice-operate em{
		display:inline-block;
		width:76px;
		height:28px;
		line-height: 28px;
		border-radius: 5px;
		font-size:12px;
		cursor:pointer;
	}
	.pagination{
		bottom:15px;
	}
	.pagination em{
		margin:0 22px;
	}
</style>