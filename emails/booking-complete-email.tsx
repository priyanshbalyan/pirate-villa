import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface BookingCompleteEmailProps {
  property: string;
  name: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const BookingCompleteEmail = ({
  property,
  name,
  email,
  checkInDate,
  checkOutDate
}: BookingCompleteEmailProps) => {
  const previewText = `Booking Complete!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Booking <strong>Complete!</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>name</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your booking has been created for Pirate Landings property. Here are the details of your booking.
            </Text>
            <Section>
              <Row>
                <Column>
                  <Text className="bg-[#f4f4f4] p-8 rounded-lg">
                    Property: The Pirates Landing {property} 3-bedroom condo in fabulous Cruz Bay with WiFi, AC<br />
                    Name: {name}<br />
                    Email: {email}<br />
                    Check-in Date: {checkInDate}<br />
                    Check-out Date: {checkOutDate}<br />
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              {/* <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Join the team
              </Button> */}
            </Section>
            {/* <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text> */}
            {/* <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" /> */}
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              {/* This invitation was intended for{" "}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{inviteFromIp}</span>{" "}
              located in{" "}
              <span className="text-black">{inviteFromLocation}</span>. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account's safety, please reply to
              this email to get in touch with us. */}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

BookingCompleteEmail.PreviewProps = {
  property: '',
  name: '',
  email: '',
  checkInDate: '',
  checkOutDate: ''
} as BookingCompleteEmailProps;

export default BookingCompleteEmail;
