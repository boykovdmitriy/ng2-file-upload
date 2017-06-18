import {
    Injectable,
    ComponentFactoryResolver,
    ViewContainerRef,
    ReflectiveInjector,
    ComponentRef,
} from "@angular/core";
import {ModalDialogBase, ModalDialogResult} from "./modalDialog.base";
import {Subject} from "rxjs/Subject";


@Injectable()
export class NotificationManager {
    private notificationBlock: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    public init(notificationBlock: ViewContainerRef) {
        this.notificationBlock = notificationBlock;
    }

    public showDialog<T extends ModalDialogBase>(componentType: { new (...args: any[]): T; },
                                                 header: string,
                                                 description: string): Subject<ModalDialogResult> {
        const dialog = this.createNotificationWithData(componentType, {
            header     : header,
            description: description
        });
        this.notificationBlock.insert(dialog.hostView);
        const subject = dialog.instance.getDialogState();
        const sub     = subject.subscribe(x => {
            dialog.destroy();
            sub.unsubscribe();
        });
        return subject;
    }

    private createComponent<T>(componentType: { new (...args: any[]): T; }): ComponentRef<T> {
        const injector = ReflectiveInjector.fromResolvedProviders([], this.notificationBlock.parentInjector);
        const factory  = this.componentFactoryResolver.resolveComponentFactory(componentType);

        return factory.create(injector);
    }

    private createNotificationWithData<T>(componentType: { new (...args: any[]): T; }, data: any): ComponentRef<T> {
        const component = this.createComponent(componentType);
        Object.assign(component.instance, data);

        return component;
    }
}