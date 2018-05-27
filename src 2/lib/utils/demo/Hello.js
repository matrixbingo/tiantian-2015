import aspect from './aspect'

export default class Hello {
    constructor() {
        this.description = 'Hello world';
    }

    //给show方法添加切入点，可添加多个
    @aspect('after', statistical)
    @aspect('before', () => {
        console.dir('-------before---------')
    })
    @aspect('before', () => {
        console.dir('-------before 2---------')
    })
    show() {
        //do something
        alert(this.description);
        console.dir('current method exec');
    }
}