import {Flex, Heading,Text} from 'native-base'
import React from 'react'
import { convertDate } from '../utils/utils'

const TripSchedule = ({trip}:any) => {

  const dateComparison = (date: any) => {
    const d = new Date(date);
    const today = new Date();
    return d < today;
  };
  return (
    <Flex
              direction="column"
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              style={{ gap: 10 }}
            >
              <Heading>Trip schedule</Heading>
              <Flex textAlign={"center"} style={{ gap: 10 }}>
                {trip.trip_schedule ? (
                  trip.trip_schedule.map((schedule: any, index: any) => {
                    return (
                      <Text
                        fontSize={14}
                        fontWeight={500}
                        key={index}
                        style={{
                          textDecorationLine:
                            dateComparison(schedule.date)
                              ? "line-through"
                              : "none",
                          color: dateComparison(schedule.date)? "gray" : "black",
                        }}
                      >
                        {convertDate(schedule.date)} -{" "}
                        <Text fontWeight={700}>{schedule.name}</Text>
                      </Text>
                    );
                  })
                ) : (
                  <Text>No schedule</Text>
                )}
              </Flex>
            </Flex>
  )
}

export default TripSchedule