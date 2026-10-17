'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  HiOutlineUser,
  HiOutlineCamera,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
} from 'react-icons/hi2'
import { CiMail, CiPhone } from 'react-icons/ci'
import { useAppSelector } from '@/Redux/store'
import { Service } from '@/Services/UserServices'
import { Notification } from '@/common/FunctionCommon/Notification'
import { handleCheckUserTokenExits } from '@/common/FunctionCommon/FunctionCommonForClientComponent'
import DeletePopup from '@/components/DeletePopup/DeletePopup'
import styles from './page.module.scss'

interface ProfileForm {
  lastName: string
  firstName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
}

const GENDERS = ['Nam', 'Nữ', 'Khác']

const GENDER_API_MAP: Record<string, string> = {
  Nam: 'MALE',
  Nữ: 'FEMALE',
  Khác: 'OTHER',
}

const GENDER_LABEL_MAP: Record<string, string> = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác',
}

const formatDateForApi = (date: string) => {
  const [year, month, day] = date.split('-')
  return year && month && day ? `${day}-${month}-${year}` : date
}

const parseDateFromApi = (date: string) => {
  const [day, month, year] = (date ?? '').split('-')
  return day && month && year ? `${year}-${month}-${day}` : ''
}

const PASSWORD_DEBOUNCE_MS = 2000

const INITIAL_FORM: ProfileForm = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: 'Nam',
  address: '',
}

type ProfileTab = 'personal' | 'password'
type Notice = { type: 'success' | 'error'; message: string } | null

function Field({
  label,
  children,
  fullWidth,
}: {
  label: string
  children: React.ReactNode
  fullWidth?: boolean
}) {
  return (
    <div className={fullWidth ? styles.fieldFull : styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  )
}

function Page() {
  const usernameLogin = useAppSelector((state) => state.signInSlice?.usernameLogin ?? '')
  const [form, setForm] = useState<ProfileForm>(INITIAL_FORM)
  const [savedForm, setSavedForm] = useState<ProfileForm>(INITIAL_FORM)
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal')
  const [notice, setNotice] = useState<Notice>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isOpenConfirmPassword, setIsOpenConfirmPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [touchedPasswords, setTouchedPasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  })
  const [debouncedPasswords, setDebouncedPasswords] = useState({ next: '', confirm: '' })

  const isPasswordsSettled =
    passwords.next === debouncedPasswords.next &&
    passwords.confirm === debouncedPasswords.confirm

  const fullName = useMemo(
    () => `${form.lastName} ${form.firstName}`.trim(),
    [form.lastName, form.firstName]
  )
  const displayName = usernameLogin || fullName || 'Người dùng HOMEFY'

  const currentPasswordError =
    touchedPasswords.current && !passwords.current
      ? 'Vui lòng nhập mật khẩu hiện tại.'
      : ''
  const newPasswordError =
    touchedPasswords.next && !passwords.next ? 'Vui lòng nhập mật khẩu mới.' : ''
  const confirmPasswordError = !touchedPasswords.confirm
    ? ''
    : !passwords.confirm
      ? 'Vui lòng xác nhận mật khẩu mới.'
      : isPasswordsSettled && passwords.confirm !== passwords.next
        ? 'Mật khẩu xác nhận không khớp.'
        : ''

  const handleFormChange = (key: keyof ProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handlePasswordChange = (key: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [key]: value }))
    setTouchedPasswords((prev) => ({ ...prev, [key]: true }))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPasswords({ next: passwords.next, confirm: passwords.confirm })
    }, PASSWORD_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [passwords.next, passwords.confirm])

  useEffect(() => {
    let cancelled = false
    const fetchProfile = async () => {
      if (!handleCheckUserTokenExits()) {
        setIsLoadingProfile(false)
        return
      }
      try {
        const res = await Service.getUserProfileApi()
        const profile = res?.data?.result
        if (!profile || cancelled) return
        const nextForm: ProfileForm = {
          lastName: profile.lastName ?? '',
          firstName: profile.firstName ?? '',
          email: profile.email ?? '',
          phone: profile.phoneNumber ?? '',
          dateOfBirth: parseDateFromApi(profile.birthdate),
          gender: GENDER_LABEL_MAP[profile.gender ?? ''] ?? 'Nam',
          address: profile.address ?? '',
        }
        setForm(nextForm)
        setSavedForm(nextForm)
      } catch {
        if (!cancelled) {
          Notification.openNotificationError('Không thể tải thông tin hồ sơ người dùng.')
        }
      } finally {
        if (!cancelled) setIsLoadingProfile(false)
      }
    }
    fetchProfile()
    return () => {
      cancelled = true
    }
  }, [])

  const handlePersonalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    setIsSaving(true)
    try {
      await Service.updateUserProfileApi({
        email: form.email,
        lastName: form.lastName,
        firstName: form.firstName,
        birthDate: formatDateForApi(form.dateOfBirth),
        phoneNumber: form.phone,
        gender: GENDER_API_MAP[form.gender] ?? 'OTHER',
        address: form.address,
      })
      setSavedForm(form)
      Notification.openNotificationSuccess('Thông tin cá nhân đã được cập nhật.')
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message
      Notification.openNotificationError(message || 'Cập nhật thông tin cá nhân thất bại.')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    if (!passwords.current.trim() || !passwords.next.trim() || !passwords.confirm.trim()) {
      setNotice({ type: 'error', message: 'Vui lòng nhập đầy đủ các trường mật khẩu.' })
      return
    }
    if (passwords.next !== passwords.confirm) {
      setNotice({ type: 'error', message: 'Mật khẩu xác nhận không khớp.' })
      return
    }
    setIsOpenConfirmPassword(true)
  }

  const handleConfirmChangePassword = async () => {
    setIsChangingPassword(true)
    try {
      await Service.changePasswordApi({
        current_password: passwords.current,
        new_password: passwords.next,
      })
      setIsOpenConfirmPassword(false)
      setPasswords({ current: '', next: '', confirm: '' })
      setTouchedPasswords({ current: false, next: false, confirm: false })
      Notification.openNotificationSuccess('Mật khẩu đã được thay đổi.')
    } catch (error) {
      setIsOpenConfirmPassword(false)
      const data = (error as { response?: { data?: { code?: number; message?: string } } })
        ?.response?.data
      const message =
        data?.code === 1006 ? 'Mật khẩu hiện tại chưa đúng' : data?.message
      Notification.openNotificationError(message || 'Đổi mật khẩu thất bại.')
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Hồ sơ người dùng</h1>
      <p className={styles.subtitle}>Quản lý thông tin cá nhân và bảo mật tài khoản của bạn</p>

      {/* ================= Avatar summary ================= */}
      <section className={styles.summaryCard}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <HiOutlineUser />
          </div>
          <button className={styles.avatarEditBtn} type='button' aria-label='Đổi ảnh đại diện'>
            <HiOutlineCamera />
          </button>
        </div>

        <div className={styles.summaryInfo}>
          <h2 className={styles.displayName}>{displayName}</h2>
          <div className={styles.summaryRows}>
            <span className={styles.summaryRow}>
              <CiMail />
              <span>{form.email}</span>
            </span>
            <span className={styles.summaryRow}>
              <CiPhone />
              <span>{form.phone}</span>
            </span>
          </div>
          <div className={styles.summaryBadges}>
            <span className={styles.verifiedBadge}>
              <HiOutlineShieldCheck />
              Đã xác minh
            </span>
            <span className={styles.memberSince}>Thành viên từ 10/2024</span>
          </div>
        </div>

        <div className={styles.summaryStats}>
          <div className={styles.statItem}>
            <strong>8</strong>
            <span>Đặt phòng</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <strong>3</strong>
            <span>Đã hoàn thành</span>
          </div>
        </div>
      </section>

      <div className={styles.tabs} role='tablist' aria-label='Cài đặt hồ sơ'>
        <button
          className={`${styles.tab} ${activeTab === 'personal' ? styles.activeTab : ''}`}
          id='personal-tab'
          type='button'
          role='tab'
          aria-selected={activeTab === 'personal'}
          aria-controls='personal-panel'
          onClick={() => { setActiveTab('personal'); setNotice(null) }}
        >
          <HiOutlineUserCircle /> Thông tin cá nhân
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'password' ? styles.activeTab : ''}`}
          id='password-tab'
          type='button'
          role='tab'
          aria-selected={activeTab === 'password'}
          aria-controls='password-panel'
          onClick={() => { setActiveTab('password'); setNotice(null) }}
        >
          <HiOutlineLockClosed /> Đổi mật khẩu
        </button>
      </div>

      {notice && (
        <p className={`${styles.notice} ${notice.type === 'success' ? styles.noticeSuccess : styles.noticeError}`} role={notice.type === 'error' ? 'alert' : 'status'}>
          {notice.message}
        </p>
      )}

      {activeTab === 'personal' ? (
        <form className={styles.contentGrid} id='personal-panel' role='tabpanel' aria-labelledby='personal-tab' onSubmit={handlePersonalSubmit}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>
              <HiOutlineUserCircle />
            </span>
            <div>
              <h3 className={styles.cardTitle}>Thông tin cá nhân</h3>
              <p className={styles.cardSubtitle}>Cập nhật thông tin để đặt phòng nhanh hơn</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <Field label='Họ và tên đệm'>
              <input
                className={styles.input}
                value={form.lastName}
                onChange={(e) => handleFormChange('lastName', e.target.value)}
                placeholder='Nhập họ và tên đệm'
              />
            </Field>

            <Field label='Tên'>
              <input
                className={styles.input}
                value={form.firstName}
                onChange={(e) => handleFormChange('firstName', e.target.value)}
                placeholder='Nhập tên'
              />
            </Field>

            <Field label='Ngày sinh'>
              <input
                className={styles.input}
                type='date'
                value={form.dateOfBirth}
                onChange={(e) => handleFormChange('dateOfBirth', e.target.value)}
              />
            </Field>

            <Field label='Giới tính'>
              <select
                className={styles.input}
                value={form.gender}
                onChange={(e) => handleFormChange('gender', e.target.value)}
              >
                {GENDERS.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </Field>

            <Field label='Email'>
              <input
                className={styles.input}
                type='email'
                value={form.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                placeholder='Nhập email'
              />
            </Field>

            <Field label='Số điện thoại'>
              <input
                className={styles.input}
                value={form.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                placeholder='Nhập số điện thoại'
              />
            </Field>

            <Field label='Địa chỉ' fullWidth>
              <input
                className={styles.input}
                value={form.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
                placeholder='Nhập địa chỉ'
              />
            </Field>
          </div>
        </section>
        <div className={styles.actionBar}>
          <button className={styles.cancelBtn} type='button' onClick={() => setForm(savedForm)}>
            Hủy
          </button>
          <button className={styles.saveBtn} type='submit' disabled={isSaving || isLoadingProfile}>
            {isSaving ? 'Đang lưu...' : 'Lưu thông tin'}
          </button>
        </div>
        </form>
      ) : (
        <form className={styles.contentGrid} id='password-panel' role='tabpanel' aria-labelledby='password-tab' onSubmit={handlePasswordSubmit}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}><HiOutlineLockClosed /></span>
            <div>
              <h3 className={styles.cardTitle}>Bảo mật tài khoản</h3>
              <p className={styles.cardSubtitle}>Đổi mật khẩu định kỳ để bảo vệ tài khoản</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <Field label='Mật khẩu hiện tại' fullWidth>
              <input
                className={`${styles.input} ${currentPasswordError ? styles.inputError : ''}`}
                type='password'
                value={passwords.current}
                required
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                placeholder='Nhập mật khẩu hiện tại'
              />
              {currentPasswordError && (
                <p className={styles.fieldErrorText}>{currentPasswordError}</p>
              )}
            </Field>

            <Field label='Mật khẩu mới'>
              <input
                className={`${styles.input} ${newPasswordError ? styles.inputError : ''}`}
                type='password'
                value={passwords.next}
                required
                onChange={(e) => handlePasswordChange('next', e.target.value)}
                placeholder='Nhập mật khẩu mới'
              />
              {newPasswordError && <p className={styles.fieldErrorText}>{newPasswordError}</p>}
            </Field>

            <Field label='Xác nhận mật khẩu mới'>
              <input
                className={`${styles.input} ${confirmPasswordError ? styles.inputError : ''}`}
                type='password'
                value={passwords.confirm}
                required
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                placeholder='Nhập lại mật khẩu mới'
              />
              {confirmPasswordError && (
                <p className={styles.fieldErrorText}>{confirmPasswordError}</p>
              )}
            </Field>
          </div>

          <div className={styles.securityNote}>
            Mật khẩu tối thiểu 8 ký tự, bao gồm chữ cái in hoa, chữ thường và số để đảm bảo an toàn
            cho tài khoản của bạn.
          </div>
        </section>
        <div className={styles.actionBar}>
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={() => {
              setPasswords({ current: '', next: '', confirm: '' })
              setTouchedPasswords({ current: false, next: false, confirm: false })
            }}
          >
            Xóa nội dung
          </button>
          <button className={styles.saveBtn} type='submit'>
            Đổi mật khẩu
          </button>
        </div>
        </form>
      )}

      <DeletePopup
        isOpen={isOpenConfirmPassword}
        title='Bạn có chắc muốn đổi mật khẩu?'
        subtitle='Sau khi đổi mật khẩu thành công, bạn sẽ dùng mật khẩu mới cho các lần đăng nhập tiếp theo.'
        setOpenPopup={setIsOpenConfirmPassword}
        handleOk={handleConfirmChangePassword}
        isLoading={isChangingPassword}
        textOk='Xác nhận'
      />
    </main>
  )
}

export default Page
