type Observer<T> = (newValue: T, oldValue: T) => void;
type Unobserve = () => void;
type Observe<T> = (observer: Observer<T>) => Unobserve;
type Update<T> = (newValue: T) => void;
export interface Store<T> {
    value: T;
    update: Update<T>;
    observe: Observe<T>;
}

export function createStore<T>(value: T): Store<T> {
    const observers = new Set<Observer<T>>();
    return {
        get value() {
            return value;
        },
        update(newValue: T) {
            const oldValue = value;
            if (newValue !== oldValue) {
                value = newValue;
                observers.forEach((observer) => observer(newValue, oldValue));
            }
        },
        observe(observer: Observer<T>) {
            observers.add(observer);
            return () => {
                observers.delete(observer);
            };
        },
    };
}
