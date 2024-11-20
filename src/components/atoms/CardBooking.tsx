import { Booking } from "~/hooks/useGetBookings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { toStartCase } from "~/utils/utils";
import { Calendar, User } from "lucide-react";
import { ReactElement } from "react";
import { Skeleton } from "~/components/ui/skeleton";

const formatDateTime = (dateTimeString: string) => {
  return new Date(dateTimeString).toDateString()
}

type Props = {
  booking: Booking | null;
  children?: ReactElement;
}

export default function CardBooking({ booking, children }: Props) {
  const skeleton = <Card className="w-[288px] h-[202px]">
    <CardHeader>
      <CardTitle><Skeleton /></CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-start">
          <User className="h-4 w-4 mr-2 mt-1" />
          <div>
            <Skeleton />
            <Skeleton />
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <Skeleton />
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <Skeleton />
        </div>
        {children}
      </div>
    </CardContent>
  </Card>

  return booking ? (
    <Card key={booking.id}>
      <CardHeader>
        <CardTitle>{toStartCase(booking.villaType)} Villa</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start">
            <User className="h-4 w-4 mr-2 mt-1" />
            <div>
              <div>{booking.name}</div>
              <div>{booking.email}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Check-in: {formatDateTime(booking.checkInDate)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Check-out: {formatDateTime(booking.checkOutDate)}</span>
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  ) : skeleton
}