const prisma = require("../db");

const getAllEvent = async () => {
  const event = await prisma.eventWb.findMany();
  return event;
};

const getEventById = async (id) => {
  const event = await prisma.eventWb.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    throw Error("data not found");
  }

  return event;
};

const getEventByStatus = async (status) => {
  const event = await prisma.eventWb.findMany({
    where: {
      status,
    },
  });

  if (!event) {
    throw Error("data not found");
  }

  return event;
};

const getEventByUseryId = async (authorId) => {
  const event = await prisma.eventWb.findUnique({
    where: {
      authorId,
    },
  });

  if (!event) {
    throw Error("data not found");
  }

  return event;
};

const createEvent = async (newEvent) => {
  const event = await prisma.eventWb.create({
    data: {
      name: newEvent.name,
      desc: newEvent.desc,
      address: newEvent.address,
      date: newEvent.date,
      call: newEvent.call,
      email: newEvent.email,
      thumbnail: newEvent.thumbnail,
      authorId: newEvent.authorId,
    },
  });

  return event;
};

const deleteEvent = async (id) => {
  await getEventById(id);

  await prisma.eventWb.delete({
    where: {
      id,
    },
  });
};

const updateEventWbById = async (id, eventWb) => {
  if (
    !eventWb.name ||
    !eventWb.desc ||
    !eventWb.address ||
    !eventWb.date ||
    !eventWb.call ||
    !eventWb.email
  ) {
    throw Error("Data are required");
  }

  const updateData = {
    name: eventWb.name,
    desc: eventWb.desc,
    address: eventWb.address,
    date: eventWb.date,
    call: eventWb.call,
    email: eventWb.email,
  };

  if (eventWb.thumbnail) {
    updateData.thumbnail = eventWb.thumbnail;
  }

  const newEventWb = await prisma.eventWb.update({
    where: { id },
    data: updateData,
  });

  return newEventWb;
};

const patchEventWbById = async (id, eventWb) => {
  const newEventWb = await prisma.eventWb.update({
    where: {
      id,
    },
    data: {
      name: eventWb.name,
      desc: eventWb.desc,
      address: eventWb.address,
      date: eventWb.date,
      call: eventWb.call,
      email: eventWb.email,
      thumbnail: eventWb.thumbnail,
    },
  });
  return newEventWb;
};

const updateStatusApproved = async (id) => {
  const newStatus = await prisma.eventWb.update({
    where: {
      id,
    },
    data: {
      status: "APPROVED",
    },
  });
  return newStatus;
};

const updateStatusRejected = async (id) => {
  const newStatus = await prisma.eventWb.update({
    where: {
      id,
    },
    data: {
      status: "REJECTED",
    },
  });
  return newStatus;
};

module.exports = {
  getAllEvent,
  getEventById,
  getEventByUseryId,
  createEvent,
  deleteEvent,
  updateEventWbById,
  patchEventWbById,
  getEventByStatus,
  updateStatusApproved,
  updateStatusRejected,
};
