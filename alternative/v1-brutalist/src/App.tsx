import { useState, useRef, useEffect, useCallback } from 'react'

// Asset paths — reference parent directory
const TRACKS = [
    { id: 'audio1', file: '../1 Eye Contact.wav', title: 'Eye Contact' },
    { id: 'audio2', file: '../2 144.wav', title: '144' },
    { id: 'audio3', file: '../3 Cvabs webs.wav', title: 'Cvabs' },
    { id: 'audio4', file: '../4 Concrete Park webs.wav', title: 'Concrete Park' },
    { id: 'audio5', file: '../5 Desert Storm webs.wav', title: 'Desert Storm' },
    { id: 'audio6', file: '../6 Focus webs.wav', title: 'Focus' },
]

const GALLERY_IMAGES = [
    { src: '../WhatsApp Image 2026-02-08 at 15.48.38.jpeg', tags: 'album,cover,main' },
    { src: '../WhatsApp Image 2026-02-08 at 16.20.01.jpeg', tags: 'photo,red' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-49-23.png', tags: 'art' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-50-43.png', tags: 'art' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-51-14.png', tags: 'art' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-51-37.png', tags: 'art' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-51-37(1).png', tags: 'art' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-51-54.png', tags: 'art' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-53-37.png', tags: 'art' },
    { src: '../[t×6s]_[027206fc-ffd8-4491-aba8-5c6a74ddd52e]_2026-02-08_15-53-48.png', tags: 'art' },
    { src: '../[t×6s]_[f351b7d2-894e-48f7-b371-74b244b36ef7]_2026-02-08_15-57-34.png', tags: 'art' },
    { src: '../[t×6s]_[5b718cab-3b08-449d-a914-b47843a98aa8]_2026-02-08_16-01-07.png', tags: 'art' },
    { src: '../[t×6s]_[5b718cab-3b08-449d-a914-b47843a98aa8]_2026-02-08_16-03-29.png', tags: 'art' },
    { src: '../[t×6s]_[5b718cab-3b08-449d-a914-b47843a98aa8]_2026-02-08_16-03-43.png', tags: 'art' },
    { src: '../[t×6s]_[0679a831-3093-4905-aba0-f65973a28f8f]_2026-02-08_16-23-09.png', tags: 'art' },
    { src: '../[t×6s]_[0679a831-3093-4905-aba0-f65973a28f8f]_2026-02-08_16-24-14.png', tags: 'art' },
    { src: '../[t×6s]_[0679a831-3093-4905-aba0-f65973a28f8f]_2026-02-08_16-24-50.png', tags: 'art' },
    { src: '../[t×6s]_[a7516edd-9b5a-4ab3-9115-90bce1ccfc31]_2026-02-08_16-26-57.png', tags: 'art' },
    { src: '../[t×6s]_[d43098c3-b783-4cd9-ab82-0fcb4cfde78e]_2026-02-08_16-30-22.png', tags: 'photo' },
    { src: '../[t×6s]_[d43098c3-b783-4cd9-ab82-0fcb4cfde78e]_2026-02-08_16-31-06.png', tags: 'photo' },
    { src: '../[t×6s]_[d43098c3-b783-4cd9-ab82-0fcb4cfde78e]_2026-02-08_16-31-41.png', tags: 'photo' },
    { src: '../DSCF9088.JPG', tags: 'photo' },
    { src: '../DSCF9094.JPG', tags: 'photo' },
    { src: '../DSCF9167.JPG', tags: 'photo' },
    { src: '../DSCF9177.JPG', tags: 'photo' },
    { src: '../DSCF9197.JPG', tags: 'photo' },
    { src: '../WhatsApp Image 2026-02-08 at 15.59.40.jpeg', tags: 'photo' },
    { src: '../[t×6s]_[5b718cab-3b08-449d-a914-b47843a98aa8]_2026-02-08_16-03-27.png', tags: 'art' },
]

function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

/* ── Audio Player Track ── */
function TrackItem({ track, isPlaying, onPlay }: {
    track: typeof TRACKS[0]
    isPlaying: boolean
    onPlay: (id: string) => void
}) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const rafRef = useRef<number>(0)

    const updateProgress = useCallback(() => {
        const a = audioRef.current
        if (!a || a.paused) return
        if (a.duration) {
            const pct = (a.currentTime / a.duration) * 100
            setProgress(pct)
            setCurrentTime(a.currentTime)
        }
        rafRef.current = requestAnimationFrame(updateProgress)
    }, [])

    useEffect(() => {
        const a = audioRef.current
        if (!a) return

        if (isPlaying) {
            a.play()
            rafRef.current = requestAnimationFrame(updateProgress)
        } else {
            a.pause()
            cancelAnimationFrame(rafRef.current)
        }

        return () => cancelAnimationFrame(rafRef.current)
    }, [isPlaying, updateProgress])

    useEffect(() => {
        const a = audioRef.current
        if (!a) return
        const onMeta = () => setDuration(a.duration)
        const onEnded = () => { setProgress(0); onPlay('') }
        a.addEventListener('loadedmetadata', onMeta)
        a.addEventListener('ended', onEnded)
        return () => {
            a.removeEventListener('loadedmetadata', onMeta)
            a.removeEventListener('ended', onEnded)
        }
    }, [onPlay])

    const seek = (val: number) => {
        const a = audioRef.current
        if (a && a.duration) {
            a.currentTime = (a.duration * val) / 100
            setProgress(val)
            setCurrentTime(a.currentTime)
        }
    }

    return (
        <div className="brutal-border border-t-0 first:border-t-2 bg-white dark:bg-black">
            <audio ref={audioRef} src={track.file} preload="metadata" />
            <div className="flex items-center gap-3 px-5 py-3">
                <button
                    onClick={() => onPlay(isPlaying ? '' : track.id)}
                    className="w-6 h-6 flex items-center justify-center text-sm font-bold hover:text-red-600 transition-none glitch-hover flex-shrink-0"
                >
                    {isPlaying ? '⏸' : '▶'}
                </button>
                <span className="text-xs uppercase tracking-[3px] font-bold min-w-[140px]">
                    {track.title}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 min-w-[90px] tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="flex-1"
                    style={{
                        background: `linear-gradient(to right, #ff0000 ${progress}%, ${isPlaying ? '#e0e0e0' : '#e0e0e0'} ${progress}%)`
                    }}
                />
                <a
                    href={track.file}
                    download
                    className="text-[10px] uppercase tracking-[2px] hover:text-red-600 flex items-center gap-1"
                >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />
                    </svg>
                    DL
                </a>
            </div>
        </div>
    )
}

/* ── Fullscreen Viewer ── */
function FullscreenViewer({ images, index, onClose, onNavigate }: {
    images: typeof GALLERY_IMAGES
    index: number
    onClose: () => void
    onNavigate: (dir: number) => void
}) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onNavigate(-1)
            if (e.key === 'ArrowRight') onNavigate(1)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose, onNavigate])

    return (
        <div
            className="fullscreen-overlay active"
            onClick={(e) => {
                if ((e.target as HTMLElement).classList.contains('fullscreen-overlay')) onClose()
            }}
        >
            <div className="flex items-stretch max-w-[90vw] max-h-[90vh] relative">
                {/* Prev arrow */}
                {index > 0 && (
                    <button
                        onClick={() => onNavigate(-1)}
                        className="absolute left-[-52px] top-1/2 -translate-y-1/2 w-11 h-11 border-2 border-black bg-white text-black grid place-items-center z-[10001] hover:border-red-600 hover:text-red-600"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                )}

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-11 h-11 border-2 border-black bg-white text-black text-2xl grid place-items-center z-[10001] font-bold hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                    ✕
                </button>

                {/* Image */}
                <div className="flex items-center justify-center">
                    <img
                        src={images[index].src}
                        alt="Fullscreen"
                        className="max-w-[65vw] max-h-[90vh] object-contain bg-white"
                    />
                </div>

                {/* Next arrow */}
                {index < images.length - 1 && (
                    <button
                        onClick={() => onNavigate(1)}
                        className="absolute right-[-52px] top-1/2 -translate-y-1/2 w-11 h-11 border-2 border-black bg-white text-black grid place-items-center z-[10001] hover:border-red-600 hover:text-red-600"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                )}

                {/* Sidebar */}
                <div className="w-[260px] bg-white border-l-2 border-black p-8 flex flex-col gap-2 flex-shrink-0 overflow-y-auto">
                    <div className="text-[9px] uppercase tracking-[4px] text-gray-500">Author</div>
                    <div className="text-xl font-bold text-black">pstr</div>
                    <div className="w-full h-[2px] bg-black my-3" />
                    <div className="text-[9px] uppercase tracking-[4px] text-gray-500">Project</div>
                    <div className="text-sm text-gray-800">EP1</div>
                    <div className="w-full h-[2px] bg-black my-3" />
                    <div className="text-[9px] uppercase tracking-[4px] text-gray-500">Medium</div>
                    <div className="text-sm text-gray-800">Digital Art / Photography</div>
                    <div className="w-full h-[2px] bg-black my-3" />
                    <div className="text-[9px] uppercase tracking-[4px] text-gray-500">Year</div>
                    <div className="text-sm text-gray-800">2026</div>
                    <div className="w-full h-[2px] bg-black my-3" />
                    <div className="text-[9px] uppercase tracking-[4px] text-gray-500">Contact</div>
                    <div className="flex flex-col gap-2 mt-1">
                        <a href="https://www.youtube.com/@pstar707" target="_blank" className="text-xs text-black hover:text-red-600 uppercase tracking-[2px]">YouTube</a>
                        <a href="https://soundcloud.com/tymek-sionko" target="_blank" className="text-xs text-black hover:text-red-600 uppercase tracking-[2px]">SoundCloud</a>
                        <a href="https://www.instagram.com/ty_meksionko/" target="_blank" className="text-xs text-black hover:text-red-600 uppercase tracking-[2px]">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ── Main App ── */
export default function App() {
    const [dark, setDark] = useState(false)
    const [playingId, setPlayingId] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

    useEffect(() => {
        document.body.classList.toggle('dark', dark)
    }, [dark])

    const filteredImages = GALLERY_IMAGES.filter(img =>
        !searchQuery || img.tags.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="scanlines min-h-screen p-10 max-md:p-5 max-md:pt-16">
            {/* Theme Toggle */}
            <div className="fixed top-5 right-5 z-[1000] max-md:top-3 max-md:right-3">
                <button
                    onClick={() => setDark(!dark)}
                    className="brutal-border px-4 py-2 text-[10px] uppercase tracking-[3px] font-bold bg-white dark:bg-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-none"
                >
                    {dark ? 'LIGHT' : 'DARK'}
                </button>
            </div>

            {/* Top Section */}
            <div className="grid grid-cols-[300px_1fr] gap-10 mb-10 max-md:grid-cols-1 max-md:gap-5">
                {/* Album Info */}
                <div className="flex flex-col max-md:items-center max-md:text-center">
                    <h1 className="text-3xl font-extrabold uppercase tracking-[6px] mb-2 title-flicker max-md:text-2xl">
                        NAZWA ALBUMU
                    </h1>
                    <p className="text-xs uppercase tracking-[4px] mb-5 text-gray-600 dark:text-gray-400">pstr</p>
                    <div className="w-full aspect-square overflow-hidden brutal-border">
                        <img
                            src="../placeholder.svg"
                            alt="Album Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Tracklist */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-lg font-bold uppercase tracking-[5px] text-center mb-5">
                        <span className="text-red-600">//</span> DIGITAL LOSSLESS ALBUM <span className="text-red-600">//</span>
                    </h2>
                    <div className="flex flex-col">
                        {TRACKS.map((track) => (
                            <TrackItem
                                key={track.id}
                                track={track}
                                isPlaying={playingId === track.id}
                                onPlay={setPlayingId}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Spotify Section */}
            <div className="text-center mt-5 mb-10">
                <a
                    href="#"
                    target="_blank"
                    className="brutal-border inline-flex items-center gap-3 px-6 py-3 text-[10px] uppercase tracking-[3px] font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-none"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    LISTEN ON SPOTIFY
                </a>
                <p className="mt-2 text-[9px] uppercase tracking-[2px] text-gray-500">Also available on Spotify</p>
            </div>

            {/* Gallery */}
            <div className="pt-10 mt-20 border-t-2 border-black dark:border-white">
                <h2 className="text-lg font-bold uppercase tracking-[5px] text-center mb-8">
                    <span className="text-red-600">[</span> GALLERY <span className="text-red-600">]</span>
                </h2>
                <div className="mb-5">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH BY TAG..."
                        className="w-full max-w-[400px] px-4 py-3 brutal-border bg-white dark:bg-black text-xs uppercase tracking-[2px] outline-none placeholder:text-gray-400"
                    />
                </div>
                <div className="grid grid-cols-6 gap-8 max-md:grid-cols-2 max-md:gap-4">
                    {filteredImages.map((img, i) => (
                        <div
                            key={i}
                            className="gallery-item relative aspect-square overflow-hidden cursor-pointer"
                            onClick={() => setFullscreenIndex(i)}
                        >
                            <img
                                src={img.src}
                                alt={`Photo ${i + 1}`}
                                className="w-full h-full object-cover bg-white"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t-2 border-black dark:border-white">
                <div className="flex justify-center gap-8 py-5">
                    <a href="https://www.youtube.com/@pstar707" target="_blank" className="hover:text-red-600 glitch-hover">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/ty_meksionko/" target="_blank" className="hover:text-red-600 glitch-hover">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                    <a href="https://soundcloud.com/tymek-sionko" target="_blank" className="hover:text-red-600 glitch-hover">
                        <img src="../cloudmark-white.png" alt="SoundCloud" width="24" height="24" className="invert dark:invert-0" />
                    </a>
                </div>
            </footer>

            {/* Fullscreen Viewer */}
            {fullscreenIndex !== null && (
                <FullscreenViewer
                    images={filteredImages}
                    index={fullscreenIndex}
                    onClose={() => setFullscreenIndex(null)}
                    onNavigate={(dir) => {
                        const next = fullscreenIndex + dir
                        if (next >= 0 && next < filteredImages.length) {
                            setFullscreenIndex(next)
                        }
                    }}
                />
            )}
        </div>
    )
}
