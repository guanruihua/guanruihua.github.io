import React, { useRef, useState } from 'react'
import { Recorder } from 'canvas-record'
import './index.less'
import { drawCountdown } from './helper'
import { Flex } from 'aurad'
import { TechnicalStack } from '@/components'

export default function Gen_video() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 重置之前的视频
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
      setVideoUrl(null)
    }
    if (videoRef.current) {
      videoRef.current.src = ''
    }

    canvas.width = 1280
    canvas.height = 720

    const fps = 30
    const duration = 10
    const totalFrames = fps * duration

    setIsRecording(true)
    setProgress(0)

    const recorder = new Recorder(ctx, {
      name: 'countdown',
      duration,
      // download: false,
      encoderOptions: {
        codec: 'avc1.64001F', // 支持 720p
        bitrate: 2_000_000,
      },
    })

    await recorder.start()

    let frame = 0
    const renderLoop = async () => {
      if (frame >= totalFrames) {
        // 所有帧已送入编码器，等待录制完成
        setIsRecording(false)
        return
      }
      const secondsLeft = Math.max(0, 10 - Math.floor(frame / fps))
      drawCountdown(ctx, secondsLeft)
      recorder.step()
      setProgress(Math.round((frame / totalFrames) * 100))
      frame++
      requestAnimationFrame(renderLoop)
    }

    await renderLoop()
  }

  return (
    <div className="gen__video">
      <div className="h3">生成 10 秒倒计时视频</div>
      {/* 生成按钮 */}
      {!videoUrl && (
        <button
          className="gen-btn"
          onClick={handleGenerate}
          disabled={isRecording}
          style={{
            backgroundColor: isRecording ? '#aaa' : '#e9456080',
            cursor: isRecording ? 'default' : 'pointer',
          }}
        >
          {isRecording ? `录制中 ${progress}%` : '生成倒计时视频'}
        </button>
      )}
      {isRecording && <p style={{ color: '#666' }}>⏳ 录制中，请稍候…</p>}
      <Flex row>
        {/* 录制预览 Canvas */}
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          style={{
            width: '100%',
            maxWidth: 640,
            border: '2px solid #333',
            borderRadius: 8,
            marginBottom: 20,
            display: videoUrl ? 'none' : 'block',
          }}
        />
      </Flex>
      <TechnicalStack>canvas-record</TechnicalStack>
    </div>
  )
}
