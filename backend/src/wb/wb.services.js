const prisma = require("../db");

const getAllWb = async () => {
  const warisanBudaya = await prisma.warisanBudaya.findMany({
    include: {
      galeri: true,
    },
  });
  return warisanBudaya;
};

const getWbById = async (id) => {
  const warisanBudaya = await prisma.warisanBudaya.findUnique({
    where: {
      id,
    },
    include: {
      galeri: true,
    },
  });

  if (!warisanBudaya) {
    throw Error("data not found");
  }

  return warisanBudaya;
};

const getWbBUseryId = async (authorId) => {
  const warisanBudaya = await prisma.warisanBudaya.findMany({
    where: {
      authorId,
    },
  });

  if (!warisanBudaya) {
    throw Error("data not found");
  }

  return warisanBudaya;
};

const getWbByTypeandStatus = async (type, status) => {
  const warisanBudaya = await prisma.warisanBudaya.findMany({
    where: {
      type,
      status,
    },
  });

  if (!warisanBudaya) {
    throw Error("data not found");
  }

  return warisanBudaya;
};

const createWB = async (newWB) => {
  const wb = await prisma.warisanBudaya.create({
    data: {
      name: newWB.name,
      desc: newWB.desc,
      category: newWB.category,
      type: newWB.type,
      kabupaten: newWB.kabupaten,
      kecamatan: newWB.kecamatan,
      address: newWB.address,
      thumbnail: newWB.thumbnail,
      youtube: newWB.youtube,
      authorId: newWB.authorId,
    },
  });

  // Jika ada URL galeri, simpan ke tabel Galeri
  if (newWB.galeri && Array.isArray(newWB.galeri)) {
    for (const url of newWB.galeri) {
      await prisma.galeri.create({
        data: {
          url,
          warisanBudayaId: wb.id,
        },
      });
    }
  }

  return wb;
};

const deleteWb = async (id) => {
  try {
    await prisma.galeri.deleteMany({
      where: {
        warisanBudayaId: id,
      },
    });

    const deletedWb = await prisma.warisanBudaya.delete({
      where: {
        id,
      },
    });

    if (!deletedWb) {
      throw new Error(`WarisanBudaya dengan ID ${id} tidak ditemukan.`);
    }

    console.log(
      `WarisanBudaya dengan ID ${id} dan galeri terkait berhasil dihapus.`
    );
  } catch (error) {
    console.error(`Gagal menghapus data dengan ID ${id}: ${error.message}`);
    throw error;
  }
};

const updateWbById = async (id, wb, galeriImages) => {
  if (
    !wb.name ||
    !wb.desc ||
    !wb.category ||
    !wb.type ||
    !wb.kabupaten ||
    !wb.kecamatan ||
    !wb.address ||
    !wb.youtube
  ) {
    throw Error("Data are required");
  }

  const updatedData = await prisma.$transaction(async (prisma) => {
    // Update warisanBudaya data
    const newWb = await prisma.warisanBudaya.update({
      where: { id },
      data: {
        name: wb.name,
        desc: wb.desc,
        category: wb.category,
        type: wb.type,
        kabupaten: wb.kabupaten,
        kecamatan: wb.kecamatan,
        address: wb.address,
        thumbnail: wb.thumbnail,
        youtube: wb.youtube,
      },
    });

    // Update galeri data
    if (galeriImages && galeriImages.length > 0) {
      // First, delete existing galeri entries associated with this warisanBudaya
      await prisma.galeri.deleteMany({
        where: { warisanBudayaId: id },
      });

      // Then, create new galeri entries
      await prisma.galeri.createMany({
        data: galeriImages.map((url) => ({
          warisanBudayaId: id,
          url: url, // Assuming 'imagePath' is the field in the galeri table
        })),
      });
    }

    return newWb;
  });

  return updatedData;
};

const updateStatusApproved = async (id) => {
  const newStatus = await prisma.warisanBudaya.update({
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
  const newStatus = await prisma.warisanBudaya.update({
    where: {
      id,
    },
    data: {
      status: "REJECTED",
    },
  });
  return newStatus;
};

const patchWbById = async (id, wb) => {
  if (
    !wb.name ||
    !wb.desc ||
    !wb.category ||
    !wb.type ||
    !wb.kabupaten ||
    !wb.kecamatan ||
    !wb.address ||
    !wb.thumbnail ||
    !wb.galeri ||
    !wb.youtube
  ) {
    throw Error("Username, email and password are required");
  }
  const newWB = await prisma.warisanBudaya.update({
    where: {
      id,
    },
    data: {
      name: wb.name,
      desc: wb.desc,
      category: wb.category,
      type: wb.type,
      kabupaten: wb.kabupaten,
      kecamatan: wb.kecamatan,
      address: wb.address,
      thumbnail: wb.thumbnail,
      galeri: wb.galeri,
      youtube: wb.youtube,
      updatedAt: "NOW"
    },
  });
  return newWB;
};

module.exports = {
  getAllWb,
  getWbById,
  createWB,
  getWbBUseryId,
  deleteWb,
  updateWbById,
  patchWbById,
  getWbByTypeandStatus,
  updateStatusApproved,
  updateStatusRejected
};
