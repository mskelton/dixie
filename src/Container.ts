export type Service = new (...args: any) => any

export class Container {
  private bound: Record<string, Service> = {}
  private services: Record<string, any> = {}

  /** Bind a class in the IOC container. */
  bind(name: string, service: Service) {
    this.bound[name] = service
  }

  /** Get a service from the IOC container. */
  get<T>(name: string): T {
    return this.services[name]
      ? (this.services[name] as T)
      : this.resolve<T>(name)
  }

  resolve<T>(name: string) {
    const constructor = this.bound[name]
    if (!constructor) {
      throw new Error(`Service ${name} not found`)
    }

    const service = new constructor(this)
    this.services[name] = service
    return service as T
  }
}
