export class apiEndpoint {
  public static readonly createRoom: string = '/meeting';

  public static readonly detailRoom = ({ friendlyId }: { friendlyId: string }): string => {
    return `/meeting/${friendlyId}`;
  }

  public static readonly getRoom = ({ friendlyId }: { friendlyId: string }): string => {
    return `/meeting/${friendlyId}/access-token`;
  }
}
