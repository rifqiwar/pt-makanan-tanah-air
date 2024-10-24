"use client";

// src/app/setting/page.tsx
import { useRouter } from "next/navigation";
import { MdAddCircleOutline } from "react-icons/md";

const ProfileSettings = () => {
  const router = useRouter();

  const navigateToProductManagement = () => {
    router.push("pages/setting/add-product");
  };
  const navigateToTambahKategori = () => {
    router.push("pages/setting/add-categories");
  };
  const navigateToTambahSlider = () => {
    router.push("pages/setting/add-slider");
  };
  const navigateToTambahKetCatering = () => {
    router.push("pages/setting/add-catering");
  };
  const navigateToTambahTesti = () => {
    router.push("pages/setting/add-testi");
  };
  const navigateToTambahTags = () => {
    router.push("pages/setting/add-tags");
  };
  const navigateToEditHeader = () => {
    router.push("pages/setting/edit-header");
  };
  const navigateToEditFooter = () => {
    router.push("pages/setting/edit-footer");
  };
  const navigateToAddAccordeon = () => {
    router.push("pages/setting/add-accordeon");
  };
  const navigateToWaButton = () => {
    router.push("pages/setting/wa-button");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md mt-8 p-6">
        <h1 className="text-xl font-semibold mb-6">Profile</h1>

        <h2 className="text-gray-600 text-sm mb-2">General Settings</h2>
        <div className="space-y-4">
          <button
            onClick={navigateToProductManagement}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Produk
          </button>
          <button
            onClick={navigateToTambahKategori}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Tambah Kategori
          </button>
          <button
            onClick={navigateToTambahTags}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Tambah Tags
          </button>
          <button
            onClick={navigateToTambahSlider}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Setting Slider
          </button>
          <button
            onClick={navigateToTambahTesti}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Tambah Testimoni
          </button>
          <button
            onClick={navigateToTambahKetCatering}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            <MdAddCircleOutline
              className="mr-2"
              color={"#000"}
              height="20px"
              width="20px"
            />
            Tambah Ket Catering
          </button>

          <h2 className="text-gray-600 text-sm mb-2">Setting Toko</h2>
          <button
            onClick={navigateToEditHeader}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Setting Header
          </button>
          <button
            onClick={navigateToEditFooter}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Setting Footer
          </button>
          <button
            onClick={navigateToAddAccordeon}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            Setting Accordeon
          </button>
          <button
            onClick={navigateToWaButton}
            className="flex items-center w-full text-left text-gray-800 hover:bg-gray-50 p-3 rounded-lg border border-gray-300"
          >
            WA Button
          </button>
          {/* Other buttons */}
        </div>
      </div>
      {/* Navigation bar */}
    </div>
  );
};

export default ProfileSettings;
