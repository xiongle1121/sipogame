<template>
	<div class="role-content-inner bag-content">
		<el-form label-width="80px">
			<el-form-item label="装备筛选 :">
				<el-select v-model="searchVal">
					<el-option value="1" label="由低到高"></el-option>
					<el-option value="2" label="由高到低"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="search-result">
            <ul class="result-list">
                <li v-for="item in bagList">
                	<img :src="baseUrl+item.src"/>
                </li>
            </ul>
        </div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				searchVal:'1',
				baseUrl:'../../../../static/img/',
				bagList : [
					{'src':'hero-bag.png'},
					{'src':'hero-bag.png'},
					{'src':'hero-bag.png'},
					{'src':'hero-bag.png'},
					{'src':'hero-bag.png'},
					{'src':'hero-bag.png'},
					{'src':'hero-bag.png'}
				]
			}		
		}
	}
</script>
<style scoped>
	.bag-content{
		padding:20px 30px;
	}
	.bag-content .el-form{
		height:40px;
		margin-bottom:35px;
	}
	.bag-content .el-form-item{
		margin-bottom:0;
	}
	.bag-content .el-select{
		width:140px;
	}
	.search-result li{
		float:left;
		width:76px;
		height:76px;
		margin:10px 4px;
		overflow:hidden;
	}
</style>