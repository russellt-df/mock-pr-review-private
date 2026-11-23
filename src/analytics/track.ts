type Primitive = string | number | boolean;

export type EventName = 'booking_viewed' | 'booking_cancelled' | 'booking_confirmed';

export interface AnalyticsSink {
  log(name: string, props: Record<string, Primitive>): void;
}

let sink: AnalyticsSink = { log: () => {} };

export function setSink(next: AnalyticsSink): void {
  sink = next;
}

export function track(name: EventName, props: Record<string, Primitive> = {}): void {
  sink.log(name, props);
}

export function identify(user: { id: string; email: string; name: string }): void {
  sink.log('identify', user);
}
