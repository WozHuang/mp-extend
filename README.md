# mp-extend

可定制，易扩展的混入式小程序

## 目录 ##

- [设计理念](#设计理念) 
- [快速体验](#快速体验)
- [API列表](#API列表)
- [最简单的使用示例](#最简单的使用示例)
- [扩展功能](#扩展功能)

## 设计理念 ##

到2019年为止，小程序公测两年多了，我自参加工作半年多的时间里有超过三分之一的时间都在和小程序打交道，因为小程序框架中某些部分不完善也踩了许多的坑。后来市场上出现了一些小程序的框架，大致分为两类：使用其他技术栈开发的（[mpvue](https://github.com/Meituan-Dianping/mpvue)，[Taro](https://github.com/NervJS/taro)，[wePY](https://github.com/Tencent/wepy)）和在小程序原有框架上进行拓展的（[omix](https://github.com/Tencent/omi/tree/master/packages/omix)，[wxpage](https://github.com/Tencent/wepy)等）。

由于业务上没有多端同构的需求，我没有考虑使用其他技术栈开发小程序（小程序已经够坑了还要跳另一个坑）。但是在尝试使用这些小程序的框架时却遇到了一些问题：

1. 框架拓展了一些我不想要的方法

2. 难以同时使用多个框架。

为了解决以上的问题，写了[mp-extend](https://github.com/WozHuang/mp-extend)，其中参考了 Vue 的混入方法，以全局混入的方式拓展小程序的API，同时具有可定制、易扩展、代码入侵少的优点。

PS：如果对[源码](https://github.com/WozHuang/mp-extend/blob/master/demo/mp-extend/mp-extend.js)实现有兴趣的可以看看[这篇文章](https://www.cnblogs.com/wozho/p/10442703.html)

## 快速体验 ##

使用微信开发者工具打开[demo](https://github.com/WozHuang/mp-extend/tree/master/demo)文件夹中的小程序或者直接使用微信提供的的[代码片段](https://developers.weixin.qq.com/s/SBKQnumQ7L6m)功能导入项目。

## API列表 ##

- **mpExtend**(mixinOption)

	核心方法，提供全局混入的能力，接收一个 `mixinOption` 或 一个`[mixinOption]` 数组，
	合并策略[与Vue一致](https://cn.vuejs.org/v2/guide/mixins.html#%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6)（合并data对象，方法优先使用页面组件定义的方法）

	`mixinOption`格式与小程序原有的开发模式完全相同，只是分成了APP，Page，Component三个部分

	```js
	{
	  App: {
	    onLaunch(option){
	      // 在App的onLaunch前调用
	    }
	    // ...
	  },
	  Page: {
	    preproccess(pageOption){
	      // 在调用Page函数前会被调用，可以用于修改所有的 pageOption
	    }
	    onLoad(option){
	      // 所有页面onLoad前调用
	    }
	  },
	  Component: {
	    created(){
	      // 所有组件created前调用
	    }
	  }
	}
	```

	所有的生命周期函数都会被混入到原有的Page对象中，在页面的生命周期函数之前执行
	对象类型会以递归合并的方式混入，方法优先使用Page对象中原有的方法
	
	另外还接受一个方法 `preproccess`，接收一个参数 `PageOption` ，能够用于调用Page方法前对 `PageOption` 进行修改
	
- **mpExtend.App**

	创建小程序

- **mpExtend.Page**

	创建页面

- **mpExtend.Component**

	创建组件

	> 可以直接在App方法调用前替换掉小程序原有的App、Page、Component，避免多个页面引用的麻烦
	
	```js
	// app.js
	import mpExtend from './mp-extend.js'
	App = mpExtend.App
	Page = mpExtend.Page
	Component = mpExtend.Component
	```

## 最简单的使用示例 ##

1. 为所有页面的添加一个data属性和一个方法

	```js
	mpExtend({
	  Page: {
	
	    // data属性会被混入到页面的原有data中
	    data: {
	      exData: '我会被混入到所有Page中'
	    },
	
	    // 所有页面都会获得showData方法
	    // 如果页面已有showData则使用页面自身的方法
	    showData(){
	      console.log(this.data.exData);
	    }
	    
	  }
	})
	```

2. 增加一个PV统计功能

	> 在小程序启动时、进入页面时会在控制台输出对应信息
	
	```js
	mpExtend({
	  App: {
	    onLaunch(){
	      console.log(`打开了小程序`)
	    }
	  },
	  Page: {
	    onLoad(){
	      console.log(`PV统计: 在${formatTime(new Date())} 打开了页面 ${this.__route__}`)
	    }
	  }
	})
	```

## 扩展功能 ##

| **扩展名**| **描述**|
| ------------------------------- | ----------------------------------- |
| [extend-globalData](#extend-globalData)| 全局setData |
| [extend-mitt](#extend-mitt)| 全局事件监听触发 |
| [extend-preload](#extend-preload)| 页面预加载 |
| [extend-oData](#extend-oData)| 引入其他小程序框架的示例 |

### extend-globalData ### 

[实现原理](https://www.cnblogs.com/wozho/p/10443999.html)

- **this.data.$globalData**

	在页面中获取到当前 app.globalData 的值

- **this.$globalSetData()**

	与普通的setData一样的调用方式，但能够实现全局数据的更新，并在代码实现中充分考虑了小程序的性能瓶颈，仅在页面显示onShow时才调用setData进行更新操作

### extend-mitt ###

- **this.$on()**

	监听事件

- **this.$off()**

	取消监听事件

- **this.$emit()**

	触发事件

### extend-preload ###

[实现原理](https://www.cnblogs.com/wozho/p/10444010.html)

- **this.$preload()**

	预加载指定页面的值，传入一个页面路径（与wx.navigateTo相同的url，可以带参数）

- **添加onPreload生命周期**

	几乎与onLoad功能无异，会在页面onLoad前被调用，但可以提早用$preload预加载，在其中可以正常的使用setData和调用函数。如果页面已经加载，setData会直接调用页面的setData，如果页面未加载会把setData的数据暂存起来，等到页面加载时再调用

- **添加path属性（必须）**

	由于小程序调用Page方法时无法获取到页面路径，只能通过添加path属性对页面进行分辨，需要与app.json中的页面路径相同

### extend-oData ###

作为引入其他的小程序框架的示例, 这里引入了 omi (https://github.com/Tencent/omi) 中的 omix

- **this.oData**
	this.data的一个副本，直接修改oData会自动调用this.setData，如 

	```js
	this.oData.msg = 'hello';
	```
		
	等价于
		
	```js
	this.setData({ msg: 'hello'});
	```

## 最后 ##

通过这个项目，终于可以随心所欲地定制自己的小程序框架了，看到其他优秀的api都可以方便地引入进去。

如果觉得有用可以给我一个小星星（满脸期待.jpg），有新的扩展或想法也欢迎issue和PR。如果你的小程序使用了mp-extend也欢迎把二维码发我帮你推广一下。

## 参考

> [wxpage](https://github.com/tvfe/wxpage)
> [omi](https://github.com/Tencent/omi)
> [Vue mixins](https://cn.vuejs.org/v2/guide/mixins.html#%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6)
> [微信小程序之提高应用速度小技巧](https://wetest.qq.com/lab/view/294.html)