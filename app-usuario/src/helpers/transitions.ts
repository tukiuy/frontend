
export default class Transitions {
    static Opacity: any = {
        enter: 'transition-all ease-in duration-300',
        enterFrom: 'backdrop-blur-none',
        enterTo: 'backdrop-blur-sm',
        leave: 'transition-all ease-in duration-100',
        leaveFrom: 'backdrop-blur-sm',
        leaveTo: 'backdrop-blur-none',
    };
    static Spin: any = {
        enter: 'transform transition duration-[400ms]',
        enterFrom: 'opacity-0 rotate-[-120deg] scale-50',
        enterTo: 'opacity-100 rotate-0 scale-100',
        leave: 'transform duration-200 transition ease-in-out',
        leaveFrom: 'opacity-100 rotate-0 scale-100',
        leaveTo: 'opacity-0 scale-95',
    };
    static Notification: any = {
        enter: 'transform ease-out duration-300 transition',
        enterFrom: 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2',
        enterTo: 'translate-y-0 opacity-100 sm:translate-x-0',
        leave: 'transition ease-in duration-100',
        leaveFrom: 'opacity-100',
        leaveTo: 'opacity-0',
    };
    static Dropdown: any = {
        enter: 'transition ease-out duration-100',
        enterFrom: 'transform opacity-0 scale-95',
        enterTo: 'transform opacity-100 scale-100',
        leave: 'transition ease-in duration-75',
        leaveFrom: 'transform opacity-100 scale-100',
        leaveTo: 'transform opacity-0 scale-95',
    };
    static FlyoutTop: any = {
        enter: 'transition ease-out duration-300',
        enterFrom: 'opacity-0 -translate-y-1',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'transition ease-in duration-300',
        leaveFrom: 'opacity-100 translate-y-0',
        leaveTo: 'opacity-0 -translate-y-1',
    };
    static FlyoutBottom: any = {
        enter: 'transition ease-out duration-300',
        enterFrom: 'opacity-0 translate-y-1',
        enterTo: 'opacity-100 translate-y-0',
        leave: 'transition ease-in duration-300',
        leaveFrom: 'opacity-100 translate-y-0',
        leaveTo: 'opacity-0 translate-y-1',
    };
    static Modal: any = {
        enter: 'ease-out duration-300',
        enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        enterTo: 'opacity-100 translate-y-0 sm:scale-100',
        leave: 'ease-in duration-200',
        leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
        leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    };
    static ModalOverlay: any = {
        enter: 'ease-out duration-300',
        enterFrom: 'opacity-0',
        enterTo: 'opacity-100',
        leave: 'ease-in duration-200',
        leaveFrom: 'opacity-100',
        leaveTo: 'opacity-0',
    };
    static Slideover: any = {
        enter: 'transition-transform ease-in duration-500 transform-gpu',
        enterFrom: 'translate-y-0',
        enterTo: 'translate-y-full',
        leave: 'transition-transform ease-out duration-500 transform-gpu',
        leaveFrom: 'translate-y-full',
        leaveTo: 'translate-y-0',
    };
    static SlideoverOverlay: any = {
        enter: 'ease-in duration-300',
        enterFrom: 'opacity-0',
        enterTo: 'opacity-100',
        leave: 'ease-in duration-300',
        leaveFrom: 'opacity-100',
        leaveTo: 'opacity-0',
    }
}