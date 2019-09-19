export abstract class IEventListener {
  public abstract function: (data: any) => any;
  public abstract context: Object;
}
