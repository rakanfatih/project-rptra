import React, { useState, useEffect } from 'react';
import api from '../../../api/axios'; 

const CMSTab = () => {
    // galeri 
    const [galleryData, setGalleryData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    
    // footer
    const [footerInfo, setFooterInfo] = useState({ 
        alamat: '', email: '', telepon: '', jam_operasional: '', instagram: '', deskripsi: '' 
    });
    const [footerLoading, setFooterLoading] = useState(false);

    useEffect(() => { fetchGallery(); fetchFooter(); }, []);

    const fetchGallery = async () => { 
        try { const res = await api.get('/cms/gallery'); setGalleryData(res.data); } 
        catch (err) { console.error("Gagal load galeri", err); } 
    };
    
    const fetchFooter = async () => { 
        try { const res = await api.get('/cms/footer'); if (res.data) setFooterInfo(res.data); } 
        catch (err) { console.error("Gagal load footer", err); } 
    };

    const handleFileSelect = (e) => { 
        const file = e.target.files[0]; 
        if (file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); } 
    };
    
    const handleUploadGallery = async (e) => {
        e.preventDefault();
        if (!selectedFile) return alert("Pilih foto dulu!");
        const formData = new FormData(); 
        formData.append('image', selectedFile); 

        setUploadLoading(true);
        try { 
            await api.post('/cms/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); 
            alert("Foto berhasil diupload!"); 
            setSelectedFile(null); setPreviewUrl(null); 
            const fileInput = document.getElementById('fileInputGaleri');
            if(fileInput) fileInput.value = '';
            fetchGallery(); 
        } catch (error) { alert("Gagal upload foto. Pastikan file < 5MB."); console.error(error); } 
        finally { setUploadLoading(false); }
    };

    const handleDeleteGallery = async (id) => { 
        if (!window.confirm("Hapus foto ini?")) return; 
        try { await api.delete(`/cms/gallery/${id}`); fetchGallery(); } catch (error) { alert("Gagal hapus."); } 
    };

    const handleFooterChange = (e) => { setFooterInfo({ ...footerInfo, [e.target.name]: e.target.value }); };
    
    const handleSaveFooter = async (e) => {
        e.preventDefault(); setFooterLoading(true);
        try { await api.post('/cms/footer', footerInfo); alert("Informasi Footer berhasil diperbarui!"); } 
        catch (error) { alert("Gagal simpan."); console.error(error); } 
        finally { setFooterLoading(false); }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* galeri */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div><h3 className="font-montserrat font-bold text-lg text-gray-800">Galeri Kegiatan</h3><p className="text-xs text-gray-500 mt-1">Upload foto kegiatan terbaru.</p></div>
                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{galleryData.length} Foto</div>
                </div>
                <div className="p-6">
                    <div className="mb-8 bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Foto Baru</label>
                            <input id="fileInputGaleri" type="file" accept="image/*" onChange={handleFileSelect} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" />
                        </div>
                        {previewUrl && (<div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm shrink-0"><img src={previewUrl} className="w-full h-full object-cover" /></div>)}
                        <button onClick={handleUploadGallery} disabled={uploadLoading || !selectedFile} className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${uploadLoading || !selectedFile ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#008C9E] text-white hover:bg-[#007382] hover:shadow-lg active:scale-95'}`}>
                            {uploadLoading ? 'Processing...' : 'Upload'}
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryData.map((img) => (
                            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition">
                                <img src={`http://127.0.0.1:8000/storage/${img.image_path}`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <button onClick={() => handleDeleteGallery(img.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition transform hover:scale-110 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* footer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-montserrat font-bold text-lg text-gray-800">Informasi Footer & Kontak</h3>
                    <p className="text-xs text-gray-500 mt-1">Data ini akan muncul di bagian bawah website.</p>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSaveFooter} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Alamat Lengkap</label>
                            <textarea name="alamat" rows="2" value={footerInfo.alamat} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition"></textarea>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">No. Telepon</label>
                            <input type="text" name="telepon" value={footerInfo.telepon} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Email</label>
                            <input type="text" name="email" value={footerInfo.email} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Jam Operasional</label>
                            <input type="text" name="jam_operasional" value={footerInfo.jam_operasional} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" placeholder="Senin - Jumat, 08:00 - 16:00" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Instagram Link</label>
                            <input type="text" name="instagram" value={footerInfo.instagram} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Deskripsi Singkat</label>
                            <input type="text" name="deskripsi" value={footerInfo.deskripsi} onChange={handleFooterChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008C9E] transition" />
                        </div>
                        <div className="col-span-2 flex justify-end mt-4">
                            <button type="submit" disabled={footerLoading} className="bg-[#2C3E50] text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-[#1a252f] transition hover:shadow-lg active:scale-95">
                                {footerLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CMSTab;