import React from 'react';

const ProfileTab = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in max-w-2xl">
        <h3 className="font-bold text-lg text-gray-800 mb-6">Edit Profil</h3>
        <form className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
                <img src={user.avatar || "/images/galeri-1.jpg"} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                <div className="text-sm">
                    <p className="font-bold text-gray-800">{user.nama_depan} {user.nama_belakang}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Depan</label>
                    <input type="text" defaultValue={user.nama_depan} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nama Belakang</label>
                    <input type="text" defaultValue={user.nama_belakang} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input type="email" defaultValue={user.email} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nomor Telepon</label>
                <input type="text" defaultValue={user.no_telepon || '-'} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50 text-gray-500 cursor-not-allowed" readOnly />
            </div>

            <div className="pt-4 text-right">
               <p className="text-xs text-gray-400 italic">Hubungi admin untuk mengubah data profil.</p>
            </div>
        </form>
    </div>
  );
};

export default ProfileTab;